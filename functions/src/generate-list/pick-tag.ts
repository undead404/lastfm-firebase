import { firestore } from 'firebase-admin';

import { TagRecord } from '../common/types';

export default async function pickTag(): Promise<TagRecord> {
  const tagsCollection = firestore().collection('tags');
  const tagsSnapshot = await tagsCollection
    .where('listCreatedAt', '==', null)
    .orderBy('power', 'desc')
    .limit(1)
    .get();
  return tagsSnapshot.docs[0].data() as TagRecord;
}
