import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import uniq from 'lodash/uniq';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function getObjectUpdate<T extends Record<string, any>>(
  oldObject: T,
  newObject: T,
): Record<string, any> {
  const diff: Record<string, any> = {};
  const objectKeys = uniq([...keys(oldObject), ...keys(newObject)]);
  forEach(objectKeys, (key) => {
    if (!isEqual(oldObject[key], newObject[key])) {
      if (isNil(newObject[key])) {
        diff[key] = null;
      } else {
        diff[key] = newObject[key];
      }
    }
  });
  return diff;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
