import compact from 'lodash/compact';
import isError from 'lodash/isError';
import map from 'lodash/map';
import deserializeTag from '../../misc/deserialize-tag';
import { SerializableTag, Tag } from '../../misc/types';

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
  pageNumber: 1,
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
        currentTag: action.tag ? deserializeTag(action.tag) : null,
        error: null,
        isLoading: false,
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
    case TAGS_ACQUIRE_SUCCESS: {
      const tags = compact(
        map<SerializableTag, Tag | null>(action.tags, deserializeTag),
      );
      return {
        ...state,
        currentTags: tags,
        error: null,
        isLoading: false,
        total: action.total,
      };
    }
    default:
      return state;
  }
}
