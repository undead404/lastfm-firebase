import find from 'lodash/find';
import get from 'lodash/get';
import size from 'lodash/size';
import { WithId } from 'mongodb';

import getCoverArtInfo from '../common/cover-art-archive/get-cover-art-info';
import mongodb from '../common/mongo-database';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

const LIMIT = 500;

export default async function populateAlbumsCovers(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const albums = (await mongodb.albums
    .find({
      thumbnail: null,
      mbid: {
        $ne: null,
      },
    })
    .sort({
      listeners: -1,
    })
    .limit(LIMIT)
    .toArray()) as WithId<AlbumRecord>[];
  await sequentialAsyncForEach(albums, async (album) => {
    if (!album.mbid) {
      return;
    }
    const coverArtInfo = await getCoverArtInfo(album.mbid);
    if (!coverArtInfo) {
      return;
    }
    const frontCoverInfo = find(
      coverArtInfo.images,
      (imageInfo) =>
        size(imageInfo.types) === 1 && imageInfo.types[0] === 'Front',
    );
    if (!frontCoverInfo) {
      return;
    }
    const thumbnail = get(frontCoverInfo, 'thumbnails.small', null);
    const large = get(frontCoverInfo, 'thumbnails.large', null);
    if (!large && !thumbnail) {
      return;
    }
    const albumUpdate: Partial<AlbumRecord> = {
      cover: large,
      thumbnail,
    };
    await mongodb.albums.updateOne({ _id: album._id }, { $set: albumUpdate });
  });
}
