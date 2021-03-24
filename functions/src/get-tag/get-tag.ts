import { logger } from 'firebase-functions';

import mongodb from '../common/mongo-database';
import serializeTag from '../common/serialize-tag';
import { SerializableTag } from '../common/types';

export default async function getTag(
  tagName: string,
): Promise<SerializableTag | null> {
  logger.info(`getTag(${tagName})`);
  let serializedTag: SerializableTag | null = null;
  if (!mongodb.isConnected) {
    await mongodb.connect();
  }
  const tag = await mongodb.tags.findOne({ name: tagName });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (tag as any)._id;
  if (!tag) {
    return null;
  }
  serializedTag = serializeTag(tag);
  return serializedTag;
}
