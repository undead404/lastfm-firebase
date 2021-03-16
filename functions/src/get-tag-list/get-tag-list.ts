import { firestore } from 'firebase-admin';
import encodeFirebaseKey from '../common/encode-firebase-key';
import { TagAlbumsList } from '../common/types';

export default async function getTagList(
  tagName: string,
): Promise<TagAlbumsList | undefined> {
  const snapshot = await firestore()
    .collection('albumsLists')
    .doc(encodeFirebaseKey(tagName))
    .get();
  return snapshot.data() as TagAlbumsList | undefined;
}
