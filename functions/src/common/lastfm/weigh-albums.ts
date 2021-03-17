import { logger } from 'firebase-functions';
import sequentialAsyncMap from '../sequential-async-map';
import { AlbumInfo, Weighted } from './api-types';

import getAlbumTagCount from './get-album-tag-count';
import getAlbumWeight from './get-album-weight';

export default async function weighAlbums(
  albums: readonly AlbumInfo[],
  tagName: string,
): Promise<readonly Weighted<AlbumInfo>[]> {
  logger.debug(`weighAlbums: [...], ${tagName}`);
  if (!albums) {
    return [];
  }
  return sequentialAsyncMap(albums, async (albumInfo) => {
    const weight =
      getAlbumWeight(albumInfo) *
      (await getAlbumTagCount(albumInfo.name, albumInfo.artist, tagName));
    return {
      ...albumInfo,
      weight,
    } as Weighted<AlbumInfo>;
  });
}
