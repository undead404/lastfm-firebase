import { formatISO } from 'date-fns';

import { SerializableTag, TagRecord } from './types';

export default function serializeTag(tag: TagRecord): SerializableTag {
  return {
    ...tag,
    lastProcessedAt: tag.lastProcessedAt
      ? formatISO(tag.lastProcessedAt)
      : null,
    listCreatedAt: tag.listCreatedAt ? formatISO(tag.listCreatedAt) : null,
  };
}
