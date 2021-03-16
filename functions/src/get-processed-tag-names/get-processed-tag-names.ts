import { firestore } from 'firebase-admin';
import invokeMap from 'lodash/invokeMap';

export default async function getProcessedTagNames(): Promise<string[]> {
  const tagNamesSnapshot = await firestore()
    .collection('albumsLists')
    .select('name')
    .get();
  return invokeMap(tagNamesSnapshot.docs, 'get', 'name');
}
