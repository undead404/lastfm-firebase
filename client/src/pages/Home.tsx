import { RedoOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  List,
  Layout,
  ListProps,
  Space,
  Typography,
} from 'antd';
import { push } from 'connected-react-router';
import isError from 'lodash/isError';
import property from 'lodash/property';
import { stringify } from 'query-string';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagPreview from '../components/TagPreview';
import usePageNumber from '../hooks/use-page-number';
import useTags from '../hooks/use-tags';
import { DEFAULT_TAGS_LIMIT } from '../misc/constants';
import { Tag } from '../misc/types';
import { acquireTags } from '../redux/actions/tags';
import { RootState } from '../redux/reducers';

const LIST_GRID_CONFIG: ListProps<Tag>['grid'] = {
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
  const total = useSelector<RootState, number>(property('tags.total'));
  const pageNumber = usePageNumber();
  const tags = useTags(pageNumber);
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
  const handleRefresh = useCallback(() => {
    dispatch(acquireTags(DEFAULT_TAGS_LIMIT * (pageNumber - 1)));
  }, [dispatch, pageNumber]);
  return (
    <Layout>
      {error && (
        <Alert message={isError(error) ? error.message : error} type="error" />
      )}
      <List
        bordered
        dataSource={tags || undefined}
        footer={
          <Typography.Paragraph>
            <Typography.Text>More coming</Typography.Text>
          </Typography.Paragraph>
        }
        grid={LIST_GRID_CONFIG}
        header={
          <Space>
            <Button
              icon={<RedoOutlined />}
              onClick={handleRefresh}
              shape="circle"
              size="large"
              title="Refresh"
              type="ghost"
            />
            <Typography.Title level={1}>
              Available genre charts
            </Typography.Title>
          </Space>
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
