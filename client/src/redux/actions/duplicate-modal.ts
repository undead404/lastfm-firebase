import { ThunkDispatch } from 'redux-thunk';
import searchAlbums from '../../https-callables/search-albums';
import { Album } from '../../misc/types';
import {
  ALBUMS_ACQUIRE_FAILURE,
  ALBUMS_ACQUIRE_LOADING,
  ALBUMS_ACQUIRE_SUCCESS,
} from '../constants/duplicate-modal';
import DuplicateModalState from '../reducers/duplicate-modal-state';

export interface AlbumsAcquireLoadingAction {
  type: typeof ALBUMS_ACQUIRE_LOADING;
}
export interface AlbumsAcquireSuccessAction {
  albums: Album[];
  type: typeof ALBUMS_ACQUIRE_SUCCESS;
}

export interface AlbumsAcquireFailureAction {
  error: Error | string;
  type: typeof ALBUMS_ACQUIRE_FAILURE;
}

export type AlbumsAcquireAction =
  | AlbumsAcquireFailureAction
  | AlbumsAcquireLoadingAction
  | AlbumsAcquireSuccessAction;

export function setAlbumsAcquireFailure(
  error: string | Error,
): AlbumsAcquireFailureAction {
  return {
    error,
    type: ALBUMS_ACQUIRE_FAILURE,
  };
}

export function setAlbumsAcquireLoading(): AlbumsAcquireLoadingAction {
  return {
    type: ALBUMS_ACQUIRE_LOADING,
  };
}

export function setAlbumsAcquireSuccess(
  albums: Album[],
): AlbumsAcquireSuccessAction {
  return {
    albums,
    type: ALBUMS_ACQUIRE_SUCCESS,
  };
}

export function searchAlbumsAction(search: string) {
  return async (
    dispatch: ThunkDispatch<
      DuplicateModalState,
      undefined,
      AlbumsAcquireAction
    >,
  ): Promise<AlbumsAcquireAction> => {
    dispatch(setAlbumsAcquireLoading());
    try {
      const albums = await searchAlbums(search);
      return dispatch(setAlbumsAcquireSuccess(albums));
    } catch (error) {
      return dispatch(setAlbumsAcquireFailure(error));
    }
  };
}
