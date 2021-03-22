import { firestore } from 'firebase-admin';
import omit from 'lodash/omit';
import encodeFirebaseKey from '../common/encode-firebase-key';

import { AlbumRecord, TagRecord } from '../common/types';

export default function saveList(
  tagRecord: TagRecord,
  albums: AlbumRecord[] | null,
): Promise<firestore.WriteResult> {
  return firestore()
    .collection('tags')
    .doc(encodeFirebaseKey(tagRecord.name))
    .set({
      ...omit(tagRecord, ['_id']),
      topAlbums: albums,
      listCreatedAt: firestore.FieldValue.serverTimestamp(),
    });
}
