import { parseISO } from 'date-fns';

import { SerializableTag, Tag } from './types';

export default function deserializeTag(tag: SerializableTag): Tag {
  return {
    ...tag,
    lastProcessedAt: tag.lastProcessedAt ? parseISO(tag.lastProcessedAt) : null,
    listCreatedAt: tag.listCreatedAt ? parseISO(tag.listCreatedAt) : null,
  };
}
