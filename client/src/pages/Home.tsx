import { Alert, List, Layout, ListProps, Typography } from 'antd';
import { push } from 'connected-react-router';
import isError from 'lodash/isError';
import property from 'lodash/property';
import toNumber from 'lodash/toNumber';
import { stringify } from 'query-string';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagPreview from '../components/TagPreview';
import useLogChanges from '../hooks/use-log-changes';
import { Tag } from '../misc/types';
import { RootState } from '../redux/reducers';
import { acquireTags } from '../redux/actions/tags';

const LIST_GRID_CONFIG = {
  gutter: 24,
  lg: 3,
  md: 3,
  sm: 1,
  xl: 4,
  xs: 1,
  xxl: 6,
};

const TAGS_PER_PAGE = 12;

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const error = useSelector<RootState, Error | string>(property('tags.error'));
  const isLoading = useSelector<RootState, boolean>(property('tags.isLoading'));
  const tags = useSelector<RootState, Tag[]>(property('tags.currentTags'));
  const total = useSelector<RootState, number>(property('tags.total'));
  const page =
    useSelector<RootState, string>(property('router.location.query.page')) ||
    '1';
  useLogChanges('Home', 'page', page);
  const pageNumber = toNumber(page);
  useLogChanges('Home', 'pageNumber', pageNumber);
  useEffect(() => {
    dispatch(acquireTags((pageNumber - 1) * TAGS_PER_PAGE, TAGS_PER_PAGE));
  }, [dispatch, pageNumber]);
  const renderTag = useCallback(
    (tag: Tag) => (
      <List.Item>
        <TagPreview tag={tag} />
      </List.Item>
    ),
    [],
  );
  const pagination = useMemo<ListProps<Tag>['pagination']>(
    () => ({
      current: pageNumber,
      disabled: total <= TAGS_PER_PAGE,
      onChange: (nextPage) => {
        dispatch(push(`/?${stringify({ page: nextPage })}`));
      },
      pageSize: TAGS_PER_PAGE,
      position: 'both',
      showSizeChanger: false,
      showTitle: true,
      total,
    }),
    [dispatch, pageNumber, total],
  );
  return (
    <Layout>
      {error && (
        <Alert message={isError(error) ? error.message : error} type="error" />
      )}
      <List
        bordered
        dataSource={tags || undefined}
        footer={<Typography.Text>More coming</Typography.Text>}
        grid={LIST_GRID_CONFIG}
        header={
          <Typography.Title level={1}>Available genre charts</Typography.Title>
        }
        loading={isLoading}
        pagination={pagination}
        renderItem={renderTag}
        rowKey="name"
        size="large"
      />
    </Layout>
  );
}
