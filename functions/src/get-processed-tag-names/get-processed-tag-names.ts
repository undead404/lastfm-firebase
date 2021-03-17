import map from 'lodash/map';

import MongoDatabase from '../common/mongo-database';

export default async function getProcessedTagNames(): Promise<string[]> {
  const mongodb = new MongoDatabase();
  await mongodb.connect();
  try {
    const tagNames = await mongodb.albumsLists
      .find({
        albums: { $ne: null },
      })
      .project({
        name: true,
      })
      .toArray();
    return map(tagNames, 'name');
  } finally {
    await mongodb.close();
  }
}
