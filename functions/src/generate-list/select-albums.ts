import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import size from 'lodash/size';
import take from 'lodash/take';
import { AlbumRecord } from '../common/types';
import weighAlbum from './weigh-album';

export default function selectAlbums(
  albums: AlbumRecord[],
  tagName: string,
  n: number,
): AlbumRecord[] | null {
  if (size(albums) < n) {
    return null;
  }
  return take(
    orderBy(
      map(albums, (album) => weighAlbum(album, tagName)),
      ['weight'],
      ['desc'],
    ),
    n,
  );
}
