import { getCacheValue, setCacheValue } from '../misc/cache';
import firebaseApp from '../misc/firebase-app';
import { Tag } from '../misc/types';

const callable = firebaseApp.functions().httpsCallable('getTags');

export default async function getTags(): Promise<Tag[] | null> {
  let tags = getCacheValue<Tag[]>('tags');
  if (!tags) {
    tags = (await callable()).data.tags;
    setCacheValue('tags', tags);
  }
  return tags;
}
