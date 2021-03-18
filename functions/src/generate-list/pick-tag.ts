import { logger } from 'firebase-functions';
import head from 'lodash/head';
import { WithId } from 'mongodb';

import mongodb from '../common/mongo-database';
import { TagRecord, Weighted } from '../common/types';

export default async function pickTag(): Promise<
  WithId<TagRecord> | undefined
> {
  let [tag]: (WithId<TagRecord> | undefined)[] = (await mongodb.tags
    .find({
      listCreatedAt: null,
    })
    .sort({ power: -1 })
    .limit(1)
    .toArray()) as WithId<TagRecord>[];
  if (tag) {
    logger.info(`Picked tag: ${tag.name}`);
    return tag;
  }
  tag = head(
    await mongodb.tags
      .find()
      .project<Weighted<WithId<TagRecord>>>({
        _id: true,
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
                  { $ifNull: ['$listCreatedAt', Date.parse('1970-01-01')] },
                ],
              },
            },
            '$power',
          ],
        },
      })
      .sort({ power: -1 })
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
