import isUndefined from 'lodash/isUndefined';

import mongoDatabase from '../common/mongo-database';

const existingTags = new Map<string, boolean>();

export default async function doesTagExist(tagName: string): Promise<boolean> {
  let result = existingTags.get(tagName);
  if (isUndefined(result)) {
    result = !!(await mongoDatabase.tags.countDocuments(
      { name: tagName },
      { limit: 1 },
    ));
    existingTags.set(tagName, result);
  }
  return result;
}
