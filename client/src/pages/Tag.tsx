import { Alert, Layout, List, ListProps, Typography } from 'antd';
import isError from 'lodash/isError';
import property from 'lodash/property';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import AlbumItem from '../components/AlbumItem';
import useTag from '../hooks/use-tag';
import { Album, Tag } from '../misc/types';
import { RootState } from '../redux/reducers';

export interface TagParameters {
  tagName: string;
}

const LIST_GRID_CONFIG: ListProps<Tag>['grid'] = {
  gutter: 24,
  lg: 2,
  md: 1,
  sm: 1,
  xl: 2,
  xs: 1,
  xxl: 3,
};

export default function TagPage(): JSX.Element {
  const { tagName } = useParams<TagParameters>();
  const error = useSelector<RootState, Error | string>(property('tags.error'));
  const isLoading = useSelector<RootState, boolean>(property('tags.isLoading'));
  const tag = useTag(tagName);
  const renderAlbum = useCallback((album: Album, index: number) => {
    return <AlbumItem album={album} index={index} />;
  }, []);
  return (
    <Layout>
      {error && (
        <Alert message={isError(error) ? error.message : error} type="error" />
      )}
      <List
        bordered
        dataSource={tag?.topAlbums || undefined}
        footer={<Typography.Text>More coming</Typography.Text>}
        grid={LIST_GRID_CONFIG}
        header={
          <Typography.Title level={1}>Best {tagName} albums</Typography.Title>
        }
        itemLayout="vertical"
        loading={isLoading}
        renderItem={renderAlbum}
      />
    </Layout>
  );
}
