import { firestore } from 'firebase-admin';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { v4 as uuid } from 'uuid';

import getTagTopAlbums from '../common/api/get-tag-top-albums';
import encodeFirebaseKey from '../common/encode-firebase-key';
// import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord, TagRecord } from '../common/types';

import getObjectUpdate from './get-object-update';

export default async function scrapeAlbumsByTag(tag: TagRecord): Promise<void> {
  const albums = await getTagTopAlbums(tag.name);
  const albumsRecords = map(
    albums,
    (album): AlbumRecord => ({
      artist: album.artist,
      duration: null,
      mbid: album.mbid || null,
      listeners: null,
      name: album.name,
      numberOfTracks: null,
      playcount: null,
      tags: null,
    }),
  );
  const collection = firestore().collection('albums');
  await Promise.all(
    map(albumsRecords, async (albumRecord) => {
      if (albumRecord.mbid) {
        await collection.doc(albumRecord.mbid).set(albumRecord);
        return;
      }
      const snapshot = await collection
        .where('artist', '==', albumRecord.artist)
        .where('name', '==', albumRecord.name)
        .get();
      if (snapshot.empty) {
        const id = uuid();
        await collection.doc(id).set(albumRecord);
      } else {
        const document = snapshot.docs[0];
        const recordedAlbumRecord = document.data() as AlbumRecord;
        const albumRecordUpdate = getObjectUpdate(
          recordedAlbumRecord,
          albumRecord,
        );
        if (!isEmpty(albumRecordUpdate)) {
          await collection.doc(document.id).update(albumRecordUpdate);
        }
      }
    }),
  );
  await firestore().collection('tags').doc(encodeFirebaseKey(tag.name)).update({
    lastProcessedAt: firestore.FieldValue.serverTimestamp(),
  });
}
