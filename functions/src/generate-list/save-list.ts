import { UpdateWriteOpResult } from 'mongodb';

import mongodb from '../common/mongo-database';
import { AlbumRecord, TagRecord, AlbumsList } from '../common/types';

export default function saveList(
  tagRecord: TagRecord,
  albums: AlbumRecord[] | null,
): Promise<UpdateWriteOpResult> {
  const list: AlbumsList = {
    albums,
    createdAt: new Date(),
    name: tagRecord.name,
  };
  return mongodb.albumsLists.updateOne(
    { name: tagRecord.name },
    { $set: list },
    {
      upsert: true,
    },
  );
}
