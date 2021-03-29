import isError from 'lodash/isError';
import { AlbumsAcquireAction } from '../actions/duplicate-modal';
import {
  ALBUMS_ACQUIRE_FAILURE,
  ALBUMS_ACQUIRE_LOADING,
  ALBUMS_ACQUIRE_SUCCESS,
} from '../constants/duplicate-modal';

import DuplicateModalState from './duplicate-modal-state';

const initialState: DuplicateModalState = {
  albums: [],
  error: null,
  isLoading: false,
};

export default function reduceDuplicateModal(
  state = initialState,
  action: AlbumsAcquireAction,
): DuplicateModalState {
  switch (action.type) {
    case ALBUMS_ACQUIRE_FAILURE:
      return {
        ...state,
        error: isError(action.error) ? action.error : new Error(action.error),
        isLoading: false,
      };
    case ALBUMS_ACQUIRE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ALBUMS_ACQUIRE_SUCCESS:
      return {
        ...state,
        albums: action.albums,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
