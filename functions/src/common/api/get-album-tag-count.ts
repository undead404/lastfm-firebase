import { logger } from 'firebase-functions';
import find from 'lodash/find';
import toLower from 'lodash/toLower';
import assure from '../assure';

import { Tag } from './api-types';
import getAlbumTopTags from './get-album-top-tags';

export default async function getAlbumTagCount(
  albumName: string,
  artistName: string,
  tagName: string,
): Promise<number> {
  logger.debug(`getAlbumTagCount(${albumName}, ${artistName}, ${tagName})`);
  assure('getAlbumTagCount', { albumName, artistName, tagName });
  const albumTags = await getAlbumTopTags(albumName, artistName);
  const tagObject = find(
    albumTags,
    (tagItem: Tag) => toLower(tagItem.name) === toLower(tagName),
  );
  if (!tagObject) {
    return 0;
  }
  return tagObject.count;
}
