import { Alert, List, Tag as AntDTag, Typography } from 'antd';
import filter from 'lodash/filter';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import getTagList from '../https-callables/get-tag-list';
import { Album, AlbumsList } from '../misc/types';

export interface TagParameters {
  tagName: string;
}

const TAG_COUNT_LIMIT = 50;

export default function Tag(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { tagName } = useParams<TagParameters>();
  const [error, setError] = useState<Error | undefined>();
  const [albumsList, setAlbumsList] = useState<AlbumsList | undefined>();
  useEffect(() => {
    setIsLoading(true);
    getTagList(tagName)
      .then(setAlbumsList)
      .finally(() => setIsLoading(false))
      .catch(setError);
  }, []);
  const renderAlbum = useCallback(
    (album: Album, index: number) => (
      <List.Item>
        <Typography.Paragraph>
          <Typography.Text>{index + 1}. </Typography.Text>
          <Typography.Text copyable>
            {`${album.artist} - ${album.name}`}
          </Typography.Text>
          {map(
            sortBy(
              filter(
                toPairs(album.tags),
                ([, tagCount]) => tagCount > TAG_COUNT_LIMIT,
              ),
              [([, tagCount]) => -tagCount],
            ),
            ([albumTagName]) => (
              <AntDTag>{albumTagName}</AntDTag>
            ),
          )}
        </Typography.Paragraph>
      </List.Item>
    ),
    [],
  );
  return (
    <>
      {error && <Alert message={error.message} type="error" />}
      <List
        bordered
        dataSource={albumsList?.albums || undefined}
        footer={<Typography.Text>More coming</Typography.Text>}
        header={<Typography.Text>Best {tagName} albums.</Typography.Text>}
        loading={isLoading}
        renderItem={renderAlbum}
      />
    </>
  );
}
