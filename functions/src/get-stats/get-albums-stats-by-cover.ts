import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';

import mongoDatabase from '../common/mongo-database';

export default async function getAlbumsStatsByCover(): Promise<
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
                        $eq: ['$cover', null],
                      },
                      then: 'unavailable',
                    },
                  },
                  if: {
                    $eq: [{ $type: '$cover' }, 'missing'],
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
