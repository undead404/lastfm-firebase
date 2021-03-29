import { Alert, Modal, Select } from 'antd';
// import filter from 'lodash/filter';
import get from 'lodash/get';
import isError from 'lodash/isError';
import map from 'lodash/map';
import property from 'lodash/property';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setAlbumDuplicate from '../https-callables/set-album-duplicate';
import { Album } from '../misc/types';
import {
  searchAlbumsAction,
  // setAlbumsAcquireSuccess,
} from '../redux/actions/duplicate-modal';
import { RootState } from '../redux/reducers';
import AlbumSelectItem from './AlbumSelectItem';

export interface DuplicateModalProperties {
  hide: () => void;
  show: () => void;
  targetId: string;
  targetArtist: string;
  visible: boolean;
}

// const NO_ALBUMS: Album[] = [];

export default function DuplicateModal({
  hide,
  show,
  targetId,
  // targetArtist,
  visible,
}: DuplicateModalProperties): JSX.Element {
  const dispatch = useDispatch();
  // const currentAlbums =
  //   useSelector<RootState, Album[]>(property('tags.currentTag.topAlbums')) ||
  //   NO_ALBUMS;
  // const defaultOptions = useMemo(
  //   () => filter(currentAlbums, ['artist', targetArtist]),
  //   [currentAlbums, targetArtist],
  // );
  const handleSearch = useCallback(
    (inputValue: string) => dispatch(searchAlbumsAction(inputValue)),
    [dispatch],
  );
  const handleSelect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (album: any) => setAlbumDuplicate(targetId, get(album, 'id')),
    [targetId],
  );
  const albums = useSelector<RootState, Album[]>(
    property('duplicateModal.albums'),
  );
  const error = useSelector<RootState, Error | string>(
    property('duplicateModal.error'),
  );
  const isLoading = useSelector<RootState, boolean>(
    property('duplicateModal.isLoading'),
  );
  const options = useMemo(
    () =>
      map(albums, (album) => ({
        label: <AlbumSelectItem album={album} />,
        value: album.id,
      })),
    [albums],
  );
  return (
    <Modal
      centered
      onCancel={hide}
      onOk={show}
      title="Duplicate?"
      visible={visible}
    >
      {error && (
        <Alert message={isError(error) ? error.message : error} type="error" />
      )}
      <Select
        allowClear
        defaultActiveFirstOption={false}
        defaultOpen={false}
        loading={isLoading}
        onSearch={handleSearch}
        onSelect={handleSelect}
        options={options}
        placeholder="Search for main item..."
        showSearch
      />
    </Modal>
  );
}
