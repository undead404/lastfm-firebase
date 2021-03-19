import { Alert, List, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';

import getTag from '../https-callables/get-tag';
import { Album, Tag } from '../misc/types';

export interface TagParameters {
  tagName: string;
}

const LIST_GRID_CONFIG = {
  gutter: 24,
  lg: 2,
  md: 1,
  sm: 1,
  xl: 2,
  xs: 1,
  xxl: 3,
};

export default function TagPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { tagName } = useParams<TagParameters>();
  const [error, setError] = useState<Error | undefined>();
  const [tag, setTag] = useState<Tag | null>(null);
  useEffect(() => {
    setIsLoading(true);
    getTag(tagName)
      .then(setTag)
      .finally(() => setIsLoading(false))
      .catch(setError);
  }, [tagName]);
  const renderAlbum = useCallback(
    (album: Album, index: number) => (
      <List.Item>
        <AlbumCard album={album} index={index} />
      </List.Item>
    ),
    [],
  );
  return (
    <>
      {error && <Alert message={error.message} type="error" />}
      <List
        bordered
        dataSource={tag?.topAlbums || undefined}
        footer={<Typography.Text>More coming</Typography.Text>}
        grid={LIST_GRID_CONFIG}
        header={
          <Typography.Title level={1}>Best {tagName} albums.</Typography.Title>
        }
        loading={isLoading}
        renderItem={renderAlbum}
      />
    </>
  );
}
