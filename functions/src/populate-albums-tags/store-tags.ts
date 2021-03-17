import { firestore } from 'firebase-admin';
import map from 'lodash/map';

import encodeFirebaseKey from '../common/encode-firebase-key';
import { TagRecord } from '../common/types';

export default async function storeTags(
  tags: Record<string, number>,
): Promise<void> {
  const collection = firestore().collection('tags');
  await Promise.all(
    map(tags, async (tagCount, tagName) => {
      const reference = collection.doc(encodeFirebaseKey(tagName));
      const snapshot = await reference.get();
      if (!snapshot.exists) {
        const tagRecord: TagRecord = {
          lastProcessedAt: null,
          name: tagName,
          power: tagCount,
        };
        await reference.set(tagRecord);
      } else {
        const tagUpdate: Partial<TagRecord> = {
          power: firestore.FieldValue.increment(tagCount),
        };
        await reference.update(tagUpdate);
      }
    }),
  );
}
