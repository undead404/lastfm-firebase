import { WithId } from 'mongodb';

import MongoDatabase from '../common/mongo-database';
import { TagRecord } from '../common/types';

export default async function pickTag(
  mongodb: MongoDatabase,
): Promise<WithId<TagRecord>> {
  const [tag] = await mongodb.tags
    .find()
    .project({
      name: true,
      lastProcessedAt: true,
      listCreatedAt: true,
      power: true,
      weight: {
        $multiply: [{ $subtract: ['$$NOW', '$listCreatedAt'] }, '$power'],
      },
    })
    .sort({ power: -1 })
    .toArray();
  return tag as WithId<TagRecord>;
}
