import { firestore } from 'firebase-admin';
import encodeFirebaseKey from '../common/encode-firebase-key';
import { AlbumRecord, TagRecord, TagsList } from '../common/types';

export default function saveList(
  tagRecord: TagRecord,
  albums: AlbumRecord[] | null,
): Promise<firestore.WriteResult> {
  const list: TagsList = {
    albums,
    createdAt: firestore.FieldValue.serverTimestamp(),
    name: tagRecord.name,
  };
  return firestore()
    .collection('albumsLists')
    .doc(encodeFirebaseKey(tagRecord.name))
    .set(list);
}
