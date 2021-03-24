import { UpdateWriteOpResult } from 'mongodb';

import mongoDatabase from '../common/mongo-database';
import { AlbumRecord, TagRecord } from '../common/types';

export default function saveList(
  tagRecord: TagRecord,
  albums: AlbumRecord[] | null,
): Promise<UpdateWriteOpResult> {
  const tagUpdate: Partial<TagRecord> = {
    listCreatedAt: new Date(),
    topAlbums: albums,
  };

  return mongoDatabase.tags.updateOne(
    { name: tagRecord.name },
    { $set: tagUpdate },
  );
}
