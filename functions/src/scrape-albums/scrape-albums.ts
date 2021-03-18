import mongodb from '../common/mongo-database';
import { TagRecord, Weighted } from '../common/types';

import scrapeAlbumsByTag from './scrape-albums-by-tag';

export default async function scrapeAlbums(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const [tag] = await mongodb.tags
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
    .toArray();
  return scrapeAlbumsByTag(tag);
}
