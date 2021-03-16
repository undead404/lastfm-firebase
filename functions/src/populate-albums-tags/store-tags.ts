import { firestore } from 'firebase-admin';
import map from 'lodash/map';

import encodeFirebaseKey from '../common/encode-firebase-key';
import { TagRecord } from '../common/types';

export default async function storeTags(tagNames: string[]): Promise<void> {
  const collection = firestore().collection('tags');
  await Promise.all(
    map(tagNames, async (tagName) => {
      const reference = collection.doc(encodeFirebaseKey(tagName));
      const snapshot = await reference.get();
      if (!snapshot.exists) {
        const tagRecord: TagRecord = {
          lastProcessedAt: null,
          name: tagName,
        };
        await reference.set(tagRecord);
      }
    }),
  );
}
