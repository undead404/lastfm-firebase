import { firestore } from 'firebase-admin';
import encodeFirebaseKey from '../common/encode-firebase-key';
import { TagRecord } from '../common/types';

export default function updateTimestamp(
  tagRecord: TagRecord,
): Promise<firestore.WriteResult> {
  return firestore()
    .collection('tags')
    .doc(encodeFirebaseKey(tagRecord.name))
    .update({
      lastProcessedAt: firestore.FieldValue.serverTimestamp(),
    });
}
