import { UpdateWriteOpResult } from 'mongodb';

import mongodb from '../common/mongo-database';
import { TagRecord } from '../common/types';

export default function updateTimestamp(
  tagRecord: Pick<TagRecord, 'name'>,
): Promise<UpdateWriteOpResult> {
  const tagUpdate: Partial<TagRecord> = {
    listCreatedAt: new Date(),
  };
  return mongodb.tags.updateOne({ name: tagRecord.name }, { $set: tagUpdate });
}
