import map from 'lodash/map';
import deserializeTag from '../misc/deserialize-tag';
import { functions, performance } from '../misc/firebase-app';
import { SerializableTag, Tag } from '../misc/types';

const callable = functions.httpsCallable('getTags');
export interface GetTagsOptions {
  limit: number;
  offset: number;
}
export interface GetTagsResponse {
  tags: SerializableTag[];
  total: number;
}
export interface GetTagsResult {
  tags: Tag[];
  total: number;
}

export default async function getTags(
  options: GetTagsOptions,
): Promise<GetTagsResult> {
  const trace = performance.trace('GET_TAGS_REQUEST');
  trace.start();
  const { data }: { data: GetTagsResponse } = await callable(options);
  const result: GetTagsResult = {
    ...data,
    tags: map(data.tags, deserializeTag),
  };
  trace.stop();
  return result;
}
