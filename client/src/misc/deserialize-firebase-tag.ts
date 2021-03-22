import { FirebaseTag, Tag } from './types';

export default function deserializeFirebaseTag(tag?: FirebaseTag): Tag | null {
  if (!tag) {
    return null;
  }
  return {
    ...tag,
    lastProcessedAt: tag.lastProcessedAt ? tag.lastProcessedAt.toDate() : null,
    listCreatedAt: tag.listCreatedAt ? tag.listCreatedAt.toDate() : null,
  };
}
