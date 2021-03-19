import { logger } from 'firebase-functions';
import mongodb from '../common/mongo-database';
import { TagRecord } from '../common/types';

const PAGINATE_PER = 12;

export default async function getTags(): Promise<TagRecord[]> {
  logger.debug('getTags()');
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  return mongodb.tags
    .find({
      topAlbums: { $ne: null },
    })
    .sort({
      listCreatedAt: -1,
    })
    .limit(PAGINATE_PER)
    .toArray();
}
