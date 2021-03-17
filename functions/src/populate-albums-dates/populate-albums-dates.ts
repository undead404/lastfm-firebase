import { firestore } from 'firebase-admin';
import get from 'lodash/get';

import getReleaseInfo from '../common/musicbrainz/get-release-info';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

const LIMIT = 1000;

export default async function populateAlbumsDates(): Promise<void> {
  const collection = firestore().collection('albums');
  const albumsSnapshot = await collection
    .where('listeners', '!=', null)
    .where('mbid', '!=', null)
    .where('date', '==', null)
    .orderBy('listeners', 'desc')
    .limit(LIMIT)
    .get();
  await sequentialAsyncForEach(albumsSnapshot.docs, async (albumSnapshot) => {
    const album = albumSnapshot.data() as AlbumRecord;
    if (!album.mbid) {
      return;
    }
    const releaseInfo = await getReleaseInfo(album.mbid);
    const date =
      get(releaseInfo, 'release-group.first-release-date') ||
      get(releaseInfo, 'date');
    if (date) {
      const albumUpdate: Partial<AlbumRecord> = {
        date,
      };
      await collection.doc(albumSnapshot.id).update(albumUpdate);
    }
  });
}
