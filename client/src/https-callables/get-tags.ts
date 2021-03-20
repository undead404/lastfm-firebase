import map from 'lodash/map';
import deserializeTag from '../misc/deserialize-tag';
import firebaseApp from '../misc/firebase-app';
import { SerializableTag, Tag } from '../misc/types';

const callable = firebaseApp.functions().httpsCallable('getTags');
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
  const { data }: { data: GetTagsResponse } = await callable(options);
  return {
    ...data,
    tags: map(data.tags, deserializeTag),
  };
}
