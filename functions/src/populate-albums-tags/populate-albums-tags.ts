import { logger } from 'firebase-functions';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import toLower from 'lodash/toLower';
import { WithId } from 'mongodb';

import getAlbumTopTags from '../common/lastfm/get-album-top-tags';
import MongoDatabase from '../common/mongo-database';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';
import storeTags from './store-tags';

const ALBUMS_LIMIT = 1000;

export default async function populateAlbumsTags(): Promise<void> {
  const mongodb = new MongoDatabase();
  await mongodb.connect();
  try {
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
      void storeTags(
        mongodb,
        mapValues(tags, (tagCount) => tagCount * (album.listeners || 0)),
      ).catch((error) => {
        logger.error(error);
        throw error;
      });
      const albumUpdate: Partial<AlbumRecord> = { tags };
      await mongodb.albums.updateOne({ _id: album._id }, { $set: albumUpdate });
    });
  } finally {
    await mongodb.close();
  }
}
