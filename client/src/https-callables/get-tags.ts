import firebaseApp from '../misc/firebase-app';
import { Tag } from '../misc/types';

const callable = firebaseApp.functions().httpsCallable('getTags');
export interface GetTagsOptions {
  limit: number;
  offset: number;
}

export interface GetTagsResponse {
  tags: Tag[];
  total: number;
}

export default async function getTags(
  options: GetTagsOptions,
): Promise<GetTagsResponse> {
  return (await callable(options)).data;
}
