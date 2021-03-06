import { Dispatch } from 'redux';
import {
  TAGS_ACQUIRE_FAILURE,
  TAGS_ACQUIRE_LOADING,
  TAGS_ACQUIRE_SUCCESS,
} from '../constants';
import { SerializableTag } from '../../misc/types';
import getTags, { GetTagsResponse } from '../../https-callables/get-tags';
import { DEFAULT_TAGS_LIMIT } from '../../misc/constants';

export interface TagsAcquireLoadingAction {
  type: typeof TAGS_ACQUIRE_LOADING;
}
export interface TagsAcquireSuccessAction {
  tags: SerializableTag[];
  total: number;
  type: typeof TAGS_ACQUIRE_SUCCESS;
}

export interface TagsAcquireFailureAction {
  error: Error | string;
  type: typeof TAGS_ACQUIRE_FAILURE;
}

export type TagsAcquireAction =
  | TagsAcquireFailureAction
  | TagsAcquireLoadingAction
  | TagsAcquireSuccessAction;

export function setTagsAcquireFailure(
  error: string | Error,
): TagsAcquireFailureAction {
  return {
    error,
    type: TAGS_ACQUIRE_FAILURE,
  };
}

export function setTagsAcquireLoading(): TagsAcquireLoadingAction {
  return {
    type: TAGS_ACQUIRE_LOADING,
  };
}

export function setTagsAcquireSuccess(
  getTagsResponse: GetTagsResponse,
): TagsAcquireSuccessAction {
  return {
    tags: getTagsResponse.tags,
    total: getTagsResponse.total,
    type: TAGS_ACQUIRE_SUCCESS,
  };
}

export function acquireTags(offset = 0, limit = DEFAULT_TAGS_LIMIT) {
  return async (
    dispatch: Dispatch<TagsAcquireAction>,
  ): Promise<TagsAcquireAction> => {
    dispatch(setTagsAcquireLoading());
    try {
      const response = await getTags({ limit, offset });
      return dispatch(setTagsAcquireSuccess(response));
    } catch (error) {
      return dispatch(setTagsAcquireFailure(error));
    }
  };
}
