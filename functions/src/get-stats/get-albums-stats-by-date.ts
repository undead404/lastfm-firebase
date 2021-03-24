import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';

import mongoDatabase from '../common/mongo-database';

export default async function getAlbumsStatsByDate(): Promise<
  Record<string, number>
> {
  return fromPairs(
    map(
      await mongoDatabase.albums
        .aggregate<Record<string, number>>([
          {
            $group: {
              _id: {
                $cond: {
                  else: {
                    $cond: {
                      else: 'available',
                      if: {
                        $eq: ['$date', null],
                      },
                      then: 'unavailable',
                    },
                  },
                  if: {
                    $eq: [{ $type: '$date' }, 'missing'],
                  },
                  then: 'processing',
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
