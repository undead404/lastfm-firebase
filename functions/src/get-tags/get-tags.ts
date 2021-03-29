import { logger } from 'firebase-functions';

import mongodb from '../common/mongo-database';
import { SerializableTag } from '../common/types';
import countTags from './count-tags';

const DEFAULT_TAGS_LIMIT = 12;

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
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const [tags, total] = await Promise.all([
    mongodb.tags
      .aggregate<SerializableTag>(
        [
          { $match: { topAlbums: { $exists: true } } },
          {
            $project: {
              _id: false,
              lastProcessedAt: true,
              name: true,
              listCreatedAt: true,
              power: true,
              topAlbums: true,
            },
          },
          {
            $sort: {
              power: -1,
            },
          },
          { $skip: offset },
          { $limit: limit },
          {
            $project: {
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
            },
          },
        ],
        {
          allowDiskUse: true,
        },
      )
      .toArray(),
    countTags(),
  ]);
  const result: GetTagsResponse = {
    tags,
    total,
  };
  return result;
}
