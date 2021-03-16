import { firestore } from 'firebase-admin';
import invokeMap from 'lodash/invokeMap';

import { AlbumRecord } from '../common/types';

import pickTag from './pick-tag';
import saveList from './save-list';
import selectAlbums from './select-albums';
import updateTimestamp from './update-timestamp';

const LIST_LENGTH = 10;

export default async function generateList(): Promise<void> {
  const tagRecord = await pickTag();
  const albumsSnapshot = await firestore()
    .collection('albums')
    .where(`tags.${tagRecord.name}`, '>', 0)
    .get();
  const albums = invokeMap(albumsSnapshot.docs, 'data') as AlbumRecord[];
  const topAlbums = selectAlbums(albums, tagRecord.name, LIST_LENGTH);
  await saveList(tagRecord, topAlbums);
  await updateTimestamp(tagRecord);
}
