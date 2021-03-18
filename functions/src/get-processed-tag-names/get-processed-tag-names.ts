import map from 'lodash/map';

import mongodb from '../common/mongo-database';

export default async function getProcessedTagNames(): Promise<string[]> {
  await mongodb.connect();
  const tagNames = await mongodb.albumsLists
    .find({
      albums: { $ne: null },
    })
    .project<{ name: string }>({
      name: true,
    })
    .toArray();
  return map(tagNames, 'name');
}
