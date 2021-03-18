import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import toLower from 'lodash/toLower';
import { WithId } from 'mongodb';

import getAlbumTopTags from '../common/lastfm/get-album-top-tags';
import mongodb from '../common/mongo-database';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

import storeTags from './store-tags';

const ALBUMS_LIMIT = 500;

export default async function populateAlbumsTags(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const albums = (await mongodb.albums
    .find({
      listeners: {
        $ne: null,
      },
      tags: null,
    })
    .limit(ALBUMS_LIMIT)
    .toArray()) as WithId<AlbumRecord>[];
  await sequentialAsyncForEach(albums, async (album) => {
    const tagsObjects = await getAlbumTopTags(album.name, album.artist);
    const tags = pickBy(
      mapValues(
        keyBy(tagsObjects, (tagObject) => toLower(tagObject.name)),
        'count',
      ),
      (tagCount) => tagCount > 1,
    );
    await storeTags(
      mapValues(tags, (tagCount) => tagCount * (album.listeners || 0)),
    );
    const albumUpdate: Partial<AlbumRecord> = { tags };
    await mongodb.albums.updateOne({ _id: album._id }, { $set: albumUpdate });
  });
}
