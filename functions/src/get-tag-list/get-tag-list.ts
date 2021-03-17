import MongoDatabase from '../common/mongo-database';
import { AlbumsList } from '../common/types';

export default async function getTagList(
  tagName: string,
): Promise<AlbumsList | null> {
  const mongodb = new MongoDatabase();
  await mongodb.connect();
  try {
    return mongodb.albumsLists.findOne({ tagName });
  } finally {
    await mongodb.close();
  }
}
