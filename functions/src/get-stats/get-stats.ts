import mongoDatabase from '../common/mongo-database';
import getAlbumsStatsByCover from './get-albums-stats-by-cover';

import getAlbumsStatsByDate from './get-albums-stats-by-date';
import getTagsStatsByListGeneration from './get-tags-stats-by-list-generation';
import getTagsStatsByProcessing from './get-tags-stats-by-processing';

export interface Stats {
  albums: {
    byCover: Record<string, number>;
    byDate: Record<string, number>;
  };
  tags: {
    byProcessing: Record<string, number>;
    byListGeneration: Record<string, number>;
  };
}

export default async function getStats(): Promise<Stats> {
  if (!mongoDatabase.isConnected) {
    await mongoDatabase.connect();
  }
  return {
    albums: {
      byCover: await getAlbumsStatsByCover(),
      byDate: await getAlbumsStatsByDate(),
    },
    tags: {
      byListGeneration: await getTagsStatsByListGeneration(),
      byProcessing: await getTagsStatsByProcessing(),
    },
  };
}
