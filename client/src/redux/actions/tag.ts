import { Dispatch } from 'redux';
import {
  TAG_ACQUIRE_FAILURE,
  TAG_ACQUIRE_LOADING,
  TAG_SET_CURRENT,
} from '../constants';
import { SerializableTag } from '../../misc/types';
import getTag from '../../https-callables/get-tag';

export interface TagAcquireLoadingAction {
  type: typeof TAG_ACQUIRE_LOADING;
}
export interface TagSetCurrentAction {
  tag?: SerializableTag;
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

export function setCurrentTag(tag?: SerializableTag): TagSetCurrentAction {
  return {
    tag,
    type: TAG_SET_CURRENT,
  };
}
export function acquireTag(tagName: string) {
  return async (
    dispatch: Dispatch<TagAcquireAction>,
  ): Promise<TagAcquireAction> => {
    dispatch(setTagAcquireLoading());
    try {
      const tag = await getTag(tagName);
      if (!tag) {
        throw new Error(`Tag "${tagName} not found.`);
      }
      return dispatch(setCurrentTag(tag));
    } catch (error) {
      return dispatch(setTagAcquireFailure(error));
    }
  };
}
