import { logger } from 'firebase-functions';
import mongodb from '../common/mongo-database';
import { TagRecord } from '../common/types';

export default async function getTag(
  tagName: string,
): Promise<TagRecord | null> {
  logger.info(`getTag(${tagName})`);
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  return mongodb.tags.findOne({ name: tagName });
}
