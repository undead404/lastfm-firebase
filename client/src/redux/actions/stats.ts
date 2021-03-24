import { ThunkDispatch } from 'redux-thunk';
import getStats, { Stats } from '../../https-callables/get-stats';
import {
  STATS_ACQUIRE_FAILURE,
  STATS_ACQUIRE_LOADING,
  STATS_ACQUIRE_SUCCESS,
} from '../constants';
import StatsState from '../reducers/stats-state';

export interface StatsAcquireLoadingAction {
  type: typeof STATS_ACQUIRE_LOADING;
}
export interface StatsAcquireSuccessAction {
  stats: Stats;
  type: typeof STATS_ACQUIRE_SUCCESS;
}

export interface StatsAcquireFailureAction {
  error: Error | string;
  type: typeof STATS_ACQUIRE_FAILURE;
}

export type StatsAcquireAction =
  | StatsAcquireFailureAction
  | StatsAcquireLoadingAction
  | StatsAcquireSuccessAction;

export function setStatsAcquireFailure(
  error: string | Error,
): StatsAcquireFailureAction {
  return {
    error,
    type: STATS_ACQUIRE_FAILURE,
  };
}

export function setStatsAcquireLoading(): StatsAcquireLoadingAction {
  return {
    type: STATS_ACQUIRE_LOADING,
  };
}

export function setStatsAcquireSuccess(
  stats: Stats,
): StatsAcquireSuccessAction {
  return {
    stats,
    type: STATS_ACQUIRE_SUCCESS,
  };
}

export function acquireStats() {
  return async (
    dispatch: ThunkDispatch<StatsState, undefined, StatsAcquireAction>,
  ): Promise<StatsAcquireAction> => {
    dispatch(setStatsAcquireLoading());
    try {
      const stats = await getStats();
      return dispatch(setStatsAcquireSuccess(stats));
    } catch (error) {
      return dispatch(setStatsAcquireFailure(error));
    }
  };
}
