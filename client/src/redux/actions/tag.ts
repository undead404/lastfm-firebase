import {
  TAG_ACQUIRE_FAILURE,
  TAG_ACQUIRE_LOADING,
  TAG_SET_CURRENT,
} from '../constants';
import { FirebaseTag } from '../../misc/types';

export interface TagAcquireLoadingAction {
  type: typeof TAG_ACQUIRE_LOADING;
}
export interface TagSetCurrentAction {
  tag?: FirebaseTag;
  type: typeof TAG_SET_CURRENT;
}

export interface TagAcquireFailureAction {
  error: Error | string;
  type: typeof TAG_ACQUIRE_FAILURE;
}

export type TagAcquireAction =
  | TagAcquireFailureAction
  | TagAcquireLoadingAction
  | TagSetCurrentAction;

export function setTagAcquireFailure(
  error: string | Error,
): TagAcquireFailureAction {
  return {
    error,
    type: TAG_ACQUIRE_FAILURE,
  };
}

export function setTagAcquireLoading(): TagAcquireLoadingAction {
  return {
    type: TAG_ACQUIRE_LOADING,
  };
}

export function setCurrentTag(tag?: FirebaseTag): TagSetCurrentAction {
  return {
    tag,
    type: TAG_SET_CURRENT,
  };
}
