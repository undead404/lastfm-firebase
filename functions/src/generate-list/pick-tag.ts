import { logger } from 'firebase-functions';
import head from 'lodash/head';
import { WithId } from 'mongodb';

import mongodb from '../common/mongo-database';
import { TagRecord, Weighted } from '../common/types';

export default async function pickTag(): Promise<
  Pick<WithId<TagRecord>, '_id' | 'name' | 'power'> | undefined
> {
  let [tag]: (
    | Pick<WithId<TagRecord>, '_id' | 'name' | 'power'>
    | undefined
  )[] = (await mongodb.tags
    .find({
      listCreatedAt: null,
    })
    .project<Pick<WithId<TagRecord>, '_id' | 'name' | 'power'>>({
      _id: true,
      name: true,
      power: true,
    })
    .sort({ power: -1 })
    .limit(1)
    .toArray()) as Pick<WithId<TagRecord>, '_id' | 'name' | 'power'>[];
  if (tag) {
    logger.info(`Picked tag: ${tag.name}`);
    return tag;
  }
  tag = head(
    await mongodb.tags
      .find()
      .project<Weighted<Pick<WithId<TagRecord>, '_id' | 'name' | 'power'>>>({
        _id: true,
        name: true,
        power: true,
        weight: {
          $multiply: [
            {
              $toLong: {
                $subtract: [
                  '$$NOW',
                  { $ifNull: ['$listCreatedAt', Date.parse('1970-01-01')] },
                ],
              },
            },
            '$power',
          ],
        },
      })
      .sort({ weight: -1 })
      .limit(1)
      .toArray(),
  );
  if (!tag) {
    logger.warn('No tags picked');
  } else {
    logger.info(`Picked tag: ${tag.name}`);
  }
  return tag;
}
