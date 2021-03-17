import MongoDatabase from '../common/mongo-database';
import scrapeAlbumsByTag from './scrape-albums-by-tag';

export default async function scrapeAlbums(): Promise<void> {
  const mongodb = new MongoDatabase();
  await mongodb.connect();
  try {
    const [tag] = await mongodb.tags
      .find()
      .project({
        name: true,
        lastProcessedAt: true,
        listCreatedAt: true,
        power: true,
        weight: {
          $multiply: [{ $subtract: ['$$NOW', '$lastProcessedAt'] }, '$power'],
        },
      })
      .sort({
        weight: -1,
      })
      .limit(1)
      .toArray();
    return scrapeAlbumsByTag(mongodb, tag);
  } finally {
    await mongodb.close();
  }
}
