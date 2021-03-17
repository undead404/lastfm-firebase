import { firestore } from 'firebase-admin';
import { logger } from 'firebase-functions';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import toLower from 'lodash/toLower';

import getAlbumTopTags from '../common/lastfm/get-album-top-tags';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';
import storeTags from './store-tags';

const ALBUMS_LIMIT = 1000;

export default async function populateAlbumsTags(): Promise<void> {
  const collection = firestore().collection('albums');
  const albumsToPopulate = (
    await collection
      .where('tags', '==', null)
      .where('listeners', '!=', null)
      .limit(ALBUMS_LIMIT)
      .get()
  ).docs;
  await sequentialAsyncForEach(albumsToPopulate, async (albumSnapshot) => {
    const albumRecord = albumSnapshot.data() as AlbumRecord;
    const tagsObjects = await getAlbumTopTags(
      albumRecord.name,
      albumRecord.artist,
    );
    const tags = mapValues(
      keyBy(tagsObjects, (tagObject) => toLower(tagObject.name)),
      'count',
    );
    void storeTags(
      mapValues(tags, (tagCount) => tagCount * (albumRecord.listeners || 0)),
    ).catch((error) => {
      logger.error(error);
      throw error;
    });
    const albumUpdate: Partial<AlbumRecord> = { tags };
    await collection.doc(albumSnapshot.id).update(albumUpdate);
  });
}
