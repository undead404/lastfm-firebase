import { formatISO } from 'date-fns';
import { logger } from 'firebase-functions';

import mongodb from '../common/mongo-database';
import { SerializableTag } from '../common/types';

export default async function getTag(
  tagName: string,
): Promise<SerializableTag | null> {
  logger.info(`getTag(${tagName})`);
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const tag = await mongodb.tags.findOne({ name: tagName });
  if (!tag) {
    return null;
  }
  return {
    ...tag,
    lastProcessedAt: tag.lastProcessedAt
      ? formatISO(tag.lastProcessedAt)
      : null,
    listCreatedAt: tag.listCreatedAt ? formatISO(tag.listCreatedAt) : null,
  };
}
