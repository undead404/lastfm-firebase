import { getCacheValue, setCacheValue } from '../misc/cache';
import firebaseApp from '../misc/firebase-app';
import { Tag } from '../misc/types';

const callable = firebaseApp.functions().httpsCallable('getTag');

export default async function getTag(tagName: string): Promise<Tag | null> {
  const cacheKey = `tag.${tagName}`;
  let tag = getCacheValue<Tag>(cacheKey);
  if (!tag) {
    tag = (await callable({ tagName })).data.tag;
    setCacheValue(cacheKey, tag);
  }
  return tag;
}
