import firebaseApp from '../misc/firebase-app';
import { Tag } from '../misc/types';

const callable = firebaseApp.functions().httpsCallable('getTag');

export default async function getTag(tagName: string): Promise<Tag | null> {
  return (await callable({ tagName })).data.tag;
}
