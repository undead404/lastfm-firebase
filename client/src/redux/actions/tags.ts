import {
  TAGS_ACQUIRE_FAILURE,
  TAGS_ACQUIRE_LOADING,
  TAGS_ACQUIRE_SUCCESS,
  TAGS_SET_PAGE_NUMBER,
} from '../constants';
import { FirebaseTag } from '../../misc/types';

export interface TagsAcquireLoadingAction {
  type: typeof TAGS_ACQUIRE_LOADING;
}
export interface TagsAcquireSuccessAction {
  tags: FirebaseTag[];
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

export interface TagsSetPageNumberAction {
  pageNumber: number;
  type: typeof TAGS_SET_PAGE_NUMBER;
}

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
  tags: FirebaseTag[],
): TagsAcquireSuccessAction {
  return {
    tags,
    type: TAGS_ACQUIRE_SUCCESS,
  };
}

export function setTagsPageNumber(pageNumber: number): TagsSetPageNumberAction {
  return {
    pageNumber,
    type: TAGS_SET_PAGE_NUMBER,
  };
}
