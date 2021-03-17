import map from 'lodash/map';
import { BulkWriteOperation, WithId } from 'mongodb';

import MongoDatabase from '../common/mongo-database';
import { TagRecord } from '../common/types';

export default async function storeTags(
  mongodb: MongoDatabase,
  tags: Record<string, number>,
): Promise<void> {
  const operations: BulkWriteOperation<TagRecord>[] = await Promise.all(
    map(tags, async (tagCount, tagName) => {
      const tag = (await mongodb.tags.findOne({
        name: tagName,
      })) as WithId<TagRecord>;
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
      };
      return { insertOne: { document: tagRecord } };
    }),
  );
  await mongodb.tags.bulkWrite(operations);
}
