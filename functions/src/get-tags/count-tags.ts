import { logger } from 'firebase-functions';

import mongodb from '../common/mongo-database';

export interface GetTagsOptions {
  limit: number;
  offset: number;
}

export default async function countTags(): Promise<number> {
  logger.debug('countTags()');
  return mongodb.tags
    .find({
      topAlbums: { $ne: null },
    })
    .count();
}
