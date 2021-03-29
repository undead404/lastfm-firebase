import { functions, performance } from '../misc/firebase-app';

const callable = functions.httpsCallable('setAlbumDuplicate');

export default async function setAlbumDuplicate(
  targetId: string,
  originalId: string,
): Promise<void> {
  const trace = performance.trace('SET_ALBUM_DUPLICATE_REQUEST');
  trace.start();
  await callable({ originalId, targetId });
  trace.stop();
}
