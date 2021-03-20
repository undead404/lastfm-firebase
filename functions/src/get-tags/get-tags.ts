import { logger } from 'firebase-functions';
import mongodb from '../common/mongo-database';
import redis from '../common/redis';
import { SerializableTag } from '../common/types';
import countTags from './count-tags';

const DEFAULT_TAGS_LIMIT = 12;
const HOUR_IN_SECONDS = 3600;

export interface GetTagsOptions {
  limit: number;
  offset: number;
}

export interface GetTagsResponse {
  tags: SerializableTag[];
  total: number;
}

export default async function getTags({
  limit = DEFAULT_TAGS_LIMIT,
  offset = 0,
}: GetTagsOptions): Promise<GetTagsResponse> {
  logger.debug('getTags()');
  const redisKey = `getTags?offset=${offset}&limit=${limit}`;
  try {
    const resultJson = await redis.get(redisKey);
    if (resultJson) {
      return JSON.parse(resultJson);
    }
  } catch (error) {
    logger.error(error);
  }
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const result: GetTagsResponse = {
    tags: await mongodb.tags
      .find({
        topAlbums: { $ne: null },
      })
      .project<SerializableTag>({
        lastProcessedAt: {
          $dateToString: {
            date: '$lastProcessedAt',
          },
        },
        name: true,
        listCreatedAt: {
          $dateToString: {
            date: '$listCreatedAt',
          },
        },
        power: true,
        topAlbums: true,
      })
      .sort({
        power: -1,
      })
      .skip(offset)
      .limit(limit)
      .toArray(),
    total: await countTags(),
  };
  void redis
    .set(redisKey, JSON.stringify(result), 'ex', HOUR_IN_SECONDS)
    .catch(logger.error);
  return result;
}
