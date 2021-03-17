import { firestore } from 'firebase-admin';
import size from 'lodash/size';
import sumBy from 'lodash/sumBy';
import toNumber from 'lodash/toNumber';

import getAlbumInfo from '../common/lastfm/get-album-info';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

const ALBUMS_LIMIT = 1000;

export default async function populateAlbumsStats(): Promise<void> {
  const collection = firestore().collection('albums');
  const albumsToPopulate = (
    await collection.where('listeners', '==', null).limit(ALBUMS_LIMIT).get()
  ).docs;
  await sequentialAsyncForEach(albumsToPopulate, async (albumSnapshot) => {
    const albumRecord = albumSnapshot.data() as AlbumRecord;
    const albumInfo = await getAlbumInfo(albumRecord.name, albumRecord.artist);
    if (albumInfo) {
      const albumUpdate: Partial<AlbumRecord> = {
        duration:
          sumBy(albumInfo.tracks.track, (track) => toNumber(track.duration)) ||
          null,
        listeners: toNumber(albumInfo.listeners),
        numberOfTracks: size(albumInfo.tracks.track) || null,
        playcount: toNumber(albumInfo.playcount),
      };
      await collection.doc(albumSnapshot.id).update(albumUpdate);
    }
  });
}
