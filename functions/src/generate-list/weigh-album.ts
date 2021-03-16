import get from 'lodash/get';

import encodeFirebaseKey from '../common/encode-firebase-key';
import { AlbumRecord } from '../common/types';

export type Weighted<T> = T & {
  weight: number;
};

const AVERAGE_NUMBER_OF_TRACKS = 7;

const AVERAGE_SONG_DURATION = 210;

const AVERAGE_ALBUM_DURATION = AVERAGE_SONG_DURATION * AVERAGE_NUMBER_OF_TRACKS;

export default function weighAlbum(
  album: AlbumRecord,
  tagName: string,
): Weighted<AlbumRecord> {
  let weight = 0;
  if (album.playcount && album.listeners) {
    const averageSongDuration =
      (album.duration || AVERAGE_ALBUM_DURATION) /
      (album.numberOfTracks || AVERAGE_NUMBER_OF_TRACKS);
    weight =
      ((album.playcount * album.listeners) /
        (album.numberOfTracks || AVERAGE_NUMBER_OF_TRACKS)) *
        averageSongDuration *
        get(album, `tags.${encodeFirebaseKey(tagName)}`, 0) || 0;
  }
  return {
    ...album,
    weight,
  };
}
