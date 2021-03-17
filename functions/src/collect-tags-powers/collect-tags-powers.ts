import { firestore } from 'firebase-admin';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

import encodeFirebaseKey from '../common/encode-firebase-key';
import { AlbumRecord, TagRecord } from '../common/types';

export default async function collectTagsPowers(): Promise<void> {
  const tagsCollection = firestore().collection('tags');
  const albumsSnapshot = await firestore()
    .collection('albums')
    .select('listeners', 'tags')
    .get();
  const tagsPowers: Record<string, number> = {};
  forEach(albumsSnapshot.docs, (albumSnapshot) => {
    const { listeners, tags } = albumSnapshot.data() as Pick<
      AlbumRecord,
      'listeners' | 'tags'
    >;
    forEach(tags, (tagCount, tagName) => {
      tagsPowers[tagName] =
        (tagsPowers[tagName] || 0) + tagCount * (listeners || 0);
    });
  });
  await Promise.all(
    map(tagsPowers, async (tagCount, tagName) => {
      const tagReference = tagsCollection.doc(encodeFirebaseKey(tagName));
      if ((await tagReference.get()).exists) {
        const tagUpdate: Partial<TagRecord> = {
          power: tagCount,
        };
        return tagReference.update(tagUpdate);
      }
      const tag: TagRecord = {
        lastProcessedAt: null,
        name: tagName,
        power: tagCount,
      };
      return tagReference.set(tag);
    }),
  );
}
