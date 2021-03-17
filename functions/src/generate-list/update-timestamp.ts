import { UpdateWriteOpResult, WithId } from 'mongodb';

import MongoDatabase from '../common/mongo-database';
import { TagRecord } from '../common/types';

export default function updateTimestamp(
  mongodb: MongoDatabase,
  tagRecord: WithId<TagRecord>,
): Promise<UpdateWriteOpResult> {
  const tagUpdate: Partial<TagRecord> = {
    listCreatedAt: new Date(),
  };
  return mongodb.tags.updateOne({ _id: tagRecord._id }, { $set: tagUpdate });
}
