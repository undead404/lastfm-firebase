import { logger } from 'firebase-functions';
import isEmpty from 'lodash/isEmpty';
import toNumber from 'lodash/toNumber';
import toPairs from 'lodash/toPairs';
import { BulkWriteOperation, WithId } from 'mongodb';

import mongodb from '../common/mongo-database';
import sequentialAsyncMap from '../common/sequential-async-map';
import { TagRecord } from '../common/types';
import doesTagExist from './does-tag-exist';

export default async function storeTags(
  tags: Record<string, string>,
): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const operations = await sequentialAsyncMap<
    [string, string],
    BulkWriteOperation<WithId<TagRecord>>
  >(toPairs(tags), async ([tagName, tagCount]) => {
    const tagExists = await doesTagExist(tagName);
    const tagCountNumber = toNumber(tagCount);
    if (tagExists) {
      return {
        updateOne: {
          filter: { name: tagName },
          update: { $inc: { power: tagCountNumber } },
        },
      };
    }
    const tagRecord: TagRecord = {
      lastProcessedAt: null,
      listCreatedAt: null,
      name: tagName,
      power: tagCountNumber,
    };
    return { insertOne: { document: tagRecord } };
  });
  if (isEmpty(operations)) {
    logger.warn('No operations this time.');
  } else {
    await mongodb.tags.bulkWrite(operations);
  }
}
