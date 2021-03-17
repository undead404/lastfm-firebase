import { firestore } from 'firebase-admin';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';

export default async function initField(
  collectionName: string,
  ...fields: string[]
): Promise<void> {
  const collection = firestore().collection(collectionName);
  const snapshot = await collection.get();
  await Promise.all(
    map(snapshot.docs, async (item) => {
      const data = item.data();
      const update: Record<string, unknown> = {};
      forEach(fields, (fieldName) => {
        if (isUndefined(data[fieldName])) {
          update[fieldName] = null;
        }
      });
      if (!isEmpty(update)) {
        await collection.doc(item.id).update(update);
      }
    }),
  );
}
