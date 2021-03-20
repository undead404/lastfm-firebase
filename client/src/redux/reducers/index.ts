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

import tagsReducer from './tags';
import TagsState from './tags-state';
import { TagAcquireAction } from '../actions/tag';
import { TagsAcquireAction } from '../actions/tags';

export default function createRootReducer(
  history: History<LocationState>,
): Reducer<
  CombinedState<
    StateFromReducersMapObject<{
      router: Reducer<RouterState<LocationState>, AnyAction>;
      tags: Reducer<TagsState, TagAcquireAction | TagsAcquireAction>;
    }>
  >,
  ActionFromReducersMapObject<{
    router: Reducer<RouterState<LocationState>, AnyAction>;
    tags: Reducer<TagsState, TagAcquireAction | TagsAcquireAction>;
  }>
> {
  return combineReducers({
    router: connectRouter(history),
    tags: tagsReducer,
  });
}

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
