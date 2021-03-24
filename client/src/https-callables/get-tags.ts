import forEach from 'lodash/forEach';
import toString from 'lodash/toString';

import { functions, performance } from '../misc/firebase-app';
import { SerializableTag } from '../misc/types';

const callable = functions.httpsCallable('getTags');
export interface GetTagsOptions {
  limit: number;
  offset: number;
}

export interface GetTagsResponse {
  tags: SerializableTag[];
  total: number;
}

export default async function getTags(
  options: GetTagsOptions,
): Promise<GetTagsResponse> {
  const trace = performance.trace('GET_TAGS_REQUEST');
  forEach(options, (value, key) => trace.putAttribute(key, toString(value)));
  trace.start();
  const response: GetTagsResponse = (await callable(options)).data;
  trace.stop();
  return response;
}
