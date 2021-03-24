import toPairs from 'lodash/toPairs';
import { BulkWriteOperation, WithId } from 'mongodb';

import mongodb from '../common/mongo-database';
import sequentialAsyncMap from '../common/sequential-async-map';
import { TagRecord } from '../common/types';

export default async function storeTags(
  tags: Record<string, number>,
): Promise<void> {
  const operations: BulkWriteOperation<TagRecord>[] = await sequentialAsyncMap(
    toPairs(tags),
    async ([tagName, tagCount]) => {
      const tag = (await mongodb.tags.findOne({
        name: tagName,
      })) as WithId<TagRecord> | undefined;
      if (tag) {
        const tagUpdate: Partial<TagRecord> = {
          power: tag.power + tagCount,
        };
        return {
          updateOne: { filter: { _id: tag._id }, update: { $set: tagUpdate } },
        };
      }
      const tagRecord: TagRecord = {
        lastProcessedAt: null,
        listCreatedAt: null,
        name: tagName,
        power: tagCount,
        topAlbums: null,
      };
      return { insertOne: { document: tagRecord } };
    },
  );
  await mongodb.tags.bulkWrite(operations);
}
