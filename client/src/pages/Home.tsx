import { Alert, List, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import getTags from '../https-callables/get-tags';
import { Tag } from '../misc/types';
import TagPreview from '../components/TagPreview';

const LIST_GRID_CONFIG = {
  gutter: 24,
  lg: 3,
  md: 3,
  sm: 1,
  xl: 4,
  xs: 1,
  xxl: 6,
};

export default function Home(): JSX.Element {
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<Tag[] | null>(null);
  useEffect(() => {
    setIsLoading(true);
    getTags()
      .then(setTags)
      .finally(() => setIsLoading(false))
      .catch(setError);
  }, []);
  const renderTag = useCallback(
    (tag: Tag) => (
      <List.Item>
        <TagPreview tag={tag} />
      </List.Item>
    ),
    [],
  );
  return (
    <>
      {error && <Alert message={error.message} type="error" />}
      <List
        bordered
        dataSource={tags || undefined}
        footer={<Typography.Text>More coming</Typography.Text>}
        grid={LIST_GRID_CONFIG}
        header={<Typography.Title level={1}>Available tags</Typography.Title>}
        loading={isLoading}
        renderItem={renderTag}
      />
    </>
  );
}
