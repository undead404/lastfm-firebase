import { logger } from 'firebase-functions';
import mongodb from '../common/mongo-database';
import { AlbumsList } from '../common/types';

export default async function getTagList(
  tagName: string,
): Promise<AlbumsList | null> {
  logger.info(`getTagList(${tagName})`);
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  return mongodb.albumsLists.findOne({ name: tagName });
}
