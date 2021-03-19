import { UpdateWriteOpResult } from 'mongodb';

import mongodb from '../common/mongo-database';
import { AlbumRecord, TagRecord } from '../common/types';

export default function saveList(
  tagRecord: Pick<TagRecord, 'name'>,
  albums: AlbumRecord[] | null,
): Promise<UpdateWriteOpResult> {
  const tagUpdate: Partial<TagRecord> = {
    topAlbums: albums,
    listCreatedAt: new Date(),
  };
  return mongodb.tags.updateOne(
    { name: tagRecord.name },
    { $set: tagUpdate },
    {
      upsert: true,
    },
  );
}
