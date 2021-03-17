import { firestore } from 'firebase-admin';

import { TagRecord } from '../common/types';

import scrapeAlbumsByTag from './scrape-albums-by-tag';

export default async function scrapeAlbums(): Promise<void> {
  const tagsSnapshot = await firestore()
    .collection('tags')
    .where('lastProcessedAt', '==', null)
    .orderBy('power', 'desc')
    .limit(1)
    .get();
  const tag = tagsSnapshot.docs[0].data() as TagRecord;
  return scrapeAlbumsByTag(tag);
}
