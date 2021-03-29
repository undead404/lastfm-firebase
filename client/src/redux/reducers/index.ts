import { History, LocationState } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import {
  ActionFromReducersMapObject,
  AnyAction,
  CombinedState,
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
} from 'redux';

import { StatsAcquireAction } from '../actions/stats';
import { TagAcquireAction } from '../actions/tag';
import { TagsAcquireAction } from '../actions/tags';

import duplicateModalReducer from './duplicate-modal';
import statsReducer from './stats';
import tagsReducer from './tags';
import TagsState from './tags-state';
import StatsState from './stats-state';
import DuplicateModalState from './duplicate-modal-state';
import { AlbumsAcquireAction } from '../actions/duplicate-modal';

export default function createRootReducer(
  history: History<LocationState>,
): Reducer<
  CombinedState<
    StateFromReducersMapObject<{
      duplicateModal: Reducer<DuplicateModalState, AlbumsAcquireAction>;
      router: Reducer<RouterState<LocationState>, AnyAction>;
      stats: Reducer<StatsState, StatsAcquireAction>;
      tags: Reducer<TagsState, TagAcquireAction | TagsAcquireAction>;
    }>
  >,
  ActionFromReducersMapObject<{
    duplicateModal: Reducer<DuplicateModalState, AlbumsAcquireAction>;
    router: Reducer<RouterState<LocationState>, AnyAction>;
    stats: Reducer<StatsState, StatsAcquireAction>;
    tags: Reducer<TagsState, TagAcquireAction | TagsAcquireAction>;
  }>
> {
  return combineReducers({
    duplicateModal: duplicateModalReducer,
    router: connectRouter(history),
    stats: statsReducer,
    tags: tagsReducer,
  });
}

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
