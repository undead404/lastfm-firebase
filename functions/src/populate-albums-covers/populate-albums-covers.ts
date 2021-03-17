import { firestore } from 'firebase-admin';
import find from 'lodash/find';
import get from 'lodash/get';
import size from 'lodash/size';

import getCoverArtInfo from '../common/cover-art-archive/get-cover-art-info';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

const LIMIT = 1000;

export default async function populateAlbumsCovers(): Promise<void> {
  const collection = firestore().collection('albums');
  const albumsSnapshot = await collection
    .where('listeners', '!=', null)
    .where('mbid', '!=', null)
    .where('cover', '==', null)
    .orderBy('listeners', 'desc')
    .limit(LIMIT)
    .get();
  await sequentialAsyncForEach(albumsSnapshot.docs, async (albumSnapshot) => {
    const album = albumSnapshot.data() as AlbumRecord;
    if (!album.mbid) {
      return;
    }
    const coverArtInfo = await getCoverArtInfo(album.mbid);
    const frontCoverInfo = find(
      coverArtInfo.images,
      (imageInfo) =>
        size(imageInfo.types) === 1 && imageInfo.types[0] === 'Front',
    );
    if (!frontCoverInfo) {
      return;
    }
    const thumbnail = get(frontCoverInfo, 'thumbnails.250', null);
    const large = get(frontCoverInfo, 'thumbnails.large', null);
    if (!large && !thumbnail) {
      return;
    }
    const albumUpdate: Partial<AlbumRecord> = {
      cover: large,
      thumbnail,
    };
    await collection.doc(albumSnapshot.id).update(albumUpdate);
  });
}
