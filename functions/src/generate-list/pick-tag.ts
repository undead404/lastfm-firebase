import { logger } from 'firebase-functions';
import head from 'lodash/head';
import { WithId } from 'mongodb';

import mongodb from '../common/mongo-database';
import { TagRecord, Weighted } from '../common/types';

export type PickedTag = Pick<WithId<TagRecord>, '_id' | 'name' | 'power'>;

export default async function pickTag(): Promise<PickedTag | undefined> {
  let [tag]: (PickedTag | undefined)[] = (await mongodb.tags
    .find({
      listCreatedAt: null,
    })
    .project<PickedTag>({
      _id: true,
      name: true,
      power: true,
    })
    .sort({ power: -1 })
    .limit(1)
    .toArray()) as PickedTag[];
  if (tag) {
    logger.info(`Picked tag: ${tag.name}`);
    return tag;
  }
  tag = head(
    await mongodb.tags
      .find()
      .project<Weighted<PickedTag>>({
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
