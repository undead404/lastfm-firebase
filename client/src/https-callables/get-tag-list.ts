import firebaseApp from '../misc/firebase-app';
import { AlbumsList } from '../misc/types';

const callable = firebaseApp.functions().httpsCallable('getTagList');

export default async function getTagList(tagName: string): Promise<AlbumsList> {
  return (await callable({ tagName })).data.tagList;
}
