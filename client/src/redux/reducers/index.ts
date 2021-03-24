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

import statsReducer from './stats';
import tagsReducer from './tags';
import TagsState from './tags-state';
import { TagAcquireAction } from '../actions/tag';
import { TagsAcquireAction } from '../actions/tags';
import StatsState from './stats-state';
import { StatsAcquireAction } from '../actions/stats';

export default function createRootReducer(
  history: History<LocationState>,
): Reducer<
  CombinedState<
    StateFromReducersMapObject<{
      router: Reducer<RouterState<LocationState>, AnyAction>;
      stats: Reducer<StatsState, StatsAcquireAction>;
      tags: Reducer<TagsState, TagAcquireAction | TagsAcquireAction>;
    }>
  >,
  ActionFromReducersMapObject<{
    router: Reducer<RouterState<LocationState>, AnyAction>;
    stats: Reducer<StatsState, StatsAcquireAction>;
    tags: Reducer<TagsState, TagAcquireAction | TagsAcquireAction>;
  }>
> {
  return combineReducers({
    router: connectRouter(history),
    stats: statsReducer,
    tags: tagsReducer,
  });
}

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
