import { logger } from 'firebase-functions';

import mongodb from '../common/mongo-database';
import redis from '../common/redis';
import serializeTag from '../common/serialize-tag';
import { SerializableTag } from '../common/types';

const HOUR_IN_SECONDS = 3600;

export default async function getTag(
  tagName: string,
): Promise<SerializableTag | null> {
  logger.info(`getTag(${tagName})`);
  const redisKey = `tag.${tagName}`;
  let serializedTag: SerializableTag | null = null;
  try {
    const tagJson = await redis.get(redisKey);
    if (tagJson) {
      serializedTag = JSON.parse(tagJson);
    }
  } catch (error) {
    logger.error(error);
  }
  if (serializedTag) {
    return serializedTag;
  }
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const tag = await mongodb.tags.findOne({ name: tagName });
  if (!tag) {
    return null;
  }
  serializedTag = serializeTag(tag);
  void redis
    .set(redisKey, JSON.stringify(serializedTag), 'ex', HOUR_IN_SECONDS)
    .catch(logger.error);
  return serializedTag;
}
