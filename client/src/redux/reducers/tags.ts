import isError from 'lodash/isError';
import uniqBy from 'lodash/uniqBy';

import { TagAcquireAction } from '../actions/tag';
import { TagsAcquireAction } from '../actions/tags';
import {
  TAGS_ACQUIRE_FAILURE,
  TAGS_ACQUIRE_LOADING,
  TAGS_ACQUIRE_SUCCESS,
  TAG_ACQUIRE_FAILURE,
  TAG_ACQUIRE_LOADING,
  TAG_SET_CURRENT,
} from '../constants';

import TagsState from './tags-state';

const initialState: TagsState = {
  currentTag: null,
  currentTags: [],
  error: null,
  isLoading: true,
  tags: [],
  total: 0,
};

export default function reduceTags(
  state = initialState,
  action: TagAcquireAction | TagsAcquireAction,
): TagsState {
  switch (action.type) {
    case TAG_ACQUIRE_FAILURE:
      return {
        ...state,
        currentTag: null,
        error: isError(action.error) ? action.error : new Error(action.error),
        isLoading: false,
      };
    case TAG_ACQUIRE_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case TAG_SET_CURRENT:
      return {
        ...state,
        currentTag: action.tag,
        error: null,
        isLoading: false,
        tags: uniqBy([...state.tags, action.tag], 'name'),
      };
    case TAGS_ACQUIRE_FAILURE:
      return {
        ...state,
        currentTags: [],
        error: isError(action.error) ? action.error : new Error(action.error),
        isLoading: false,
      };
    case TAGS_ACQUIRE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TAGS_ACQUIRE_SUCCESS:
      return {
        ...state,
        currentTags: action.tags,
        error: null,
        isLoading: false,
        tags: uniqBy([...state.tags, ...action.tags], 'name'),
        total: action.total,
      };
    default:
      return state;
  }
}
