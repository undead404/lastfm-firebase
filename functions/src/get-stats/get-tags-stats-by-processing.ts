import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';

import mongoDatabase from '../common/mongo-database';

export default async function getTagsStatsByProcessing(): Promise<
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
                  else: 'unprocessed',
                  if: {
                    $ne: ['$lastProcessedAt', null],
                  },
                  then: 'processed',
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
