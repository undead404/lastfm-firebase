import find from 'lodash/find';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  TAG_ACQUIRE_FAILURE,
  TAG_ACQUIRE_LOADING,
  TAG_SET_CURRENT,
} from '../constants';
import getTag from '../../https-callables/get-tag';
import { Tag } from '../../misc/types';
import TagsState from '../reducers/tags-state';

export interface TagAcquireLoadingAction {
  type: typeof TAG_ACQUIRE_LOADING;
}
export interface TagSetCurrentAction {
  tag: Tag;
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

export function setCurrentTag(tag: Tag): TagSetCurrentAction {
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

export function setCurrentTagByName(tagName: string) {
  return async (
    dispatch: ThunkDispatch<
      TagsState,
      undefined,
      TagAcquireAction | TagSetCurrentAction
    >,
    getState: () => TagsState,
  ): Promise<TagAcquireAction> => {
    const { tags } = getState();
    const currentTag = find(tags, ['name', tagName]);
    if (currentTag) {
      return dispatch(setCurrentTag(currentTag));
    }
    return dispatch(acquireTag(tagName));
  };
}
