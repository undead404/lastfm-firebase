import { functions, performance } from '../misc/firebase-app';
import { Album } from '../misc/types';

const callable = functions.httpsCallable('searchAlbums');

export default async function searchAlbums(search: string): Promise<Album[]> {
  const trace = performance.trace('SEARCH_ALBUMS_REQUEST');
  trace.start();
  const { albums }: { albums: Album[] } = (await callable({ search })).data;
  trace.stop();
  return albums;
}
