import firebaseApp from '../misc/firebase-app';

const callable = firebaseApp.functions().httpsCallable('getProcessedTagNames');

export default async function getProcessedTagNames(): Promise<string[]> {
  return (await callable()).data.tags;
}
