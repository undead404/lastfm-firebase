import map from 'lodash/map';
import { WithId } from 'mongodb';

import mongoDatabase from '../common/mongo-database';
import serializeAlbum from '../common/serialize-album';
import { AlbumRecord, SerializableAlbum } from '../common/types';

const SEARCH_LIMIT = 20;

export default async function searchAlbums({
  search,
}: {
  search: string;
}): Promise<{ albums: SerializableAlbum[] }> {
  if (!mongoDatabase.isConnected) {
    await mongoDatabase.connect();
  }
  return {
    albums: map<WithId<AlbumRecord>, SerializableAlbum>(
      await mongoDatabase.albums
        .find({
          $text: { $search: search },
        })
        .limit(SEARCH_LIMIT)
        .toArray(),
      serializeAlbum,
    ),
  };
}
