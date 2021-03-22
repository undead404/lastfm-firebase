import compact from 'lodash/compact';
import isError from 'lodash/isError';
import map from 'lodash/map';
import size from 'lodash/size';
import deserializeFirebaseTag from '../../misc/deserialize-firebase-tag';
import { FirebaseTag, Tag } from '../../misc/types';

import { TagAcquireAction } from '../actions/tag';
import { TagsAcquireAction, TagsSetPageNumberAction } from '../actions/tags';
import {
  TAGS_ACQUIRE_FAILURE,
  TAGS_ACQUIRE_LOADING,
  TAGS_ACQUIRE_SUCCESS,
  TAGS_SET_PAGE_NUMBER,
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

const DEFAULT_TAGS_LIMIT = 12;

export default function reduceTags(
  state = initialState,
  action: TagAcquireAction | TagsAcquireAction | TagsSetPageNumberAction,
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
        currentTag: deserializeFirebaseTag(action.tag),
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
        map<FirebaseTag, Tag | null>(action.tags, deserializeFirebaseTag),
      );
      return {
        ...state,
        currentTags: tags.slice(
          DEFAULT_TAGS_LIMIT * (state.pageNumber - 1),
          DEFAULT_TAGS_LIMIT * state.pageNumber,
        ),
        error: null,
        isLoading: false,
        tags,
        total: size(tags),
      };
    }
    case TAGS_SET_PAGE_NUMBER:
      return {
        ...state,
        currentTags: state.tags.slice(
          DEFAULT_TAGS_LIMIT * (action.pageNumber - 1),
          DEFAULT_TAGS_LIMIT * action.pageNumber,
        ),
        pageNumber: action.pageNumber,
      };
    default:
      return state;
  }
}
