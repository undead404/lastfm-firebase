import { logger } from 'firebase-functions';
import head from 'lodash/head';

import mongodb from '../common/mongo-database';
import { TagRecord, Weighted } from '../common/types';

import scrapeAlbumsByTag from './scrape-albums-by-tag';

export default async function scrapeAlbums(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  let [tag]: (TagRecord | undefined)[] = await mongodb.tags
    .find({
      lastProcessedAt: null,
    })
    .sort({
      power: -1,
    })
    .limit(1)
    .toArray();
  if (!tag) {
    tag = head(
      await mongodb.tags
        .find()
        .project<Weighted<TagRecord>>({
          name: true,
          lastProcessedAt: true,
          listCreatedAt: true,
          power: true,
          weight: {
            $multiply: [
              {
                $toLong: {
                  $subtract: [
                    '$$NOW',
                    { $ifNull: ['$lastProcessedAt', Date.parse('2021-03-17')] },
                  ],
                },
              },
              '$power',
            ],
          },
        })
        .sort({
          weight: -1,
        })
        .limit(1)
        .toArray(),
    );
  }
  if (!tag) {
    logger.error('Failed to find a tag to scrape albums by');
    return;
  }
  await scrapeAlbumsByTag(tag);
  const tagUpdate: Partial<TagRecord> = {
    lastProcessedAt: new Date(),
  };
  await mongodb.tags.updateOne({ name: tag.name }, { $set: tagUpdate });
}
