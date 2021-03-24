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
  const [
    albumStatsByCover,
    albumStatsByDate,
    tagsStatsByListGeneration,
    tagsStatsByProcessing,
  ] = await Promise.all([
    getAlbumsStatsByCover(),
    getAlbumsStatsByDate(),
    getTagsStatsByListGeneration(),
    getTagsStatsByProcessing(),
  ]);
  return {
    albums: {
      byCover: albumStatsByCover,
      byDate: albumStatsByDate,
    },
    tags: {
      byListGeneration: tagsStatsByListGeneration,
      byProcessing: tagsStatsByProcessing,
    },
  };
}
