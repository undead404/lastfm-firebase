import { logger } from 'firebase-functions';

import acquire from '../acquire';
import assure from '../assure';
import { AlbumGetInfoPayload, AlbumInfo } from './api-types';

export default async function getAlbumInfo(
  albumName: string,
  artistName: string,
): Promise<AlbumInfo | undefined> {
  logger.debug(`album.getInfo(${albumName}, ${artistName})`);
  assure('album.getInfo', { albumName, artistName });
  const data = await acquire<AlbumGetInfoPayload>({
    album: albumName,
    artist: artistName,
    method: 'album.getInfo',
  });
  return data?.album;
}
