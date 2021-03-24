import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';

import mongoDatabase from '../common/mongo-database';

export default async function getTagsStatsByListGeneration(): Promise<
  Record<string, number>
> {
  return fromPairs(
    map(
      await mongoDatabase.tags
        .aggregate<Record<string, number>>([
          {
            $group: {
              _id: {
                $cond: {
                  else: {
                    $cond: {
                      else: 'available',
                      if: {
                        $lt: ['$listCreatedAt', '$lastProcessedAt'],
                      },
                      then: 'outdated',
                    },
                  },
                  if: {
                    $eq: ['$listCreatedAt', null],
                  },
                  then: 'unavailable',
                },
              },
              count: { $sum: 1 },
            },
          },
        ])
        .toArray(),
      ({ _id, count }) => [_id, count],
    ),
  );
}
