import size from 'lodash/size';
import sumBy from 'lodash/sumBy';
import toNumber from 'lodash/toNumber';
import { WithId } from 'mongodb';

import getAlbumInfo from '../common/lastfm/get-album-info';
import mongodb from '../common/mongo-database';
import sequentialAsyncForEach from '../common/sequential-async-for-each';
import { AlbumRecord } from '../common/types';

const ALBUMS_LIMIT = 1000;

export default async function populateAlbumsStats(): Promise<void> {
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const albums = (await mongodb.albums
    .find({ listeners: null })
    .limit(ALBUMS_LIMIT)
    .toArray()) as WithId<AlbumRecord>[];
  await sequentialAsyncForEach(albums, async (album) => {
    const albumInfo = await getAlbumInfo(album.name, album.artist);
    if (albumInfo) {
      const albumUpdate: Partial<AlbumRecord> = {
        duration:
          sumBy(albumInfo.tracks.track, (track) => toNumber(track.duration)) ||
          null,
        listeners: toNumber(albumInfo.listeners),
        numberOfTracks: size(albumInfo.tracks.track) || null,
        playcount: toNumber(albumInfo.playcount),
      };
      await mongodb.albums.updateOne({ _id: album._id }, { $set: albumUpdate });
    }
  });
}
