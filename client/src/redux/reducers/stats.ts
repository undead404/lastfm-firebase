import isError from 'lodash/isError';

import { StatsAcquireAction } from '../actions/stats';
import {
  STATS_ACQUIRE_FAILURE,
  STATS_ACQUIRE_LOADING,
  STATS_ACQUIRE_SUCCESS,
} from '../constants';
import StatsState from './stats-state';

const initialState: StatsState = {
  error: null,
  isLoading: false,
  stats: null,
};

export default function reduceStats(
  state = initialState,
  action: StatsAcquireAction,
): StatsState {
  switch (action.type) {
    case STATS_ACQUIRE_FAILURE:
      return {
        ...state,
        error: isError(action.error) ? action.error : new Error(action.error),
        isLoading: false,
      };
    case STATS_ACQUIRE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STATS_ACQUIRE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        stats: action.stats,
      };
    default:
      return state;
  }
}
