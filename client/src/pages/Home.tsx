import { Alert, List, Layout, ListProps, Typography } from 'antd';
import { push } from 'connected-react-router';
import isError from 'lodash/isError';
import property from 'lodash/property';
import toNumber from 'lodash/toNumber';
import { stringify } from 'query-string';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagPreview from '../components/TagPreview';
import useTags from '../hooks/use-tags';
import { DEFAULT_TAGS_LIMIT } from '../misc/constants';
import { Tag } from '../misc/types';
import { setTagsPageNumber } from '../redux/actions/tags';
import { RootState } from '../redux/reducers';

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
  const dispatch = useDispatch();
  const error = useSelector<RootState, Error | string>(property('tags.error'));
  const isLoading = useSelector<RootState, boolean>(property('tags.isLoading'));
  useTags();
  const currentTags = useSelector<RootState, Tag[]>(
    property('tags.currentTags'),
  );
  const total = useSelector<RootState, number>(property('tags.total'));
  const page = useSelector<RootState, string>(
    property('router.location.query.page'),
  );
  const pageNumber = toNumber(page) || 1;
  useEffect(() => {
    dispatch(setTagsPageNumber(pageNumber));
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
      disabled: total <= DEFAULT_TAGS_LIMIT,
      onChange: (nextPage) => {
        dispatch(push(`/?${stringify({ page: nextPage })}`));
      },
      pageSize: DEFAULT_TAGS_LIMIT,
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
        dataSource={currentTags || undefined}
        footer={
          <Typography.Paragraph>
            <Typography.Text>More coming</Typography.Text>
          </Typography.Paragraph>
        }
        grid={LIST_GRID_CONFIG}
        header={
          <Typography.Paragraph>
            <Typography.Title level={1}>
              Available genre charts
            </Typography.Title>
          </Typography.Paragraph>
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
