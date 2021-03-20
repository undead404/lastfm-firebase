import { logger } from 'firebase-functions';
import mongodb from '../common/mongo-database';
import { TagRecord } from '../common/types';
import countTags from './count-tags';

const DEFAULT_TAGS_LIMIT = 12;

export interface GetTagsOptions {
  limit: number;
  offset: number;
}

export interface GetTagsResponse {
  tags: TagRecord[];
  total: number;
}

export default async function getTags({
  limit = DEFAULT_TAGS_LIMIT,
  offset = 0,
}: GetTagsOptions): Promise<GetTagsResponse> {
  logger.debug('getTags()');
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  return {
    tags: await mongodb.tags
      .find({
        topAlbums: { $ne: null },
      })
      .sort({
        power: -1,
      })
      .skip(offset)
      .limit(limit)
      .toArray(),
    total: await countTags(),
  };
}
