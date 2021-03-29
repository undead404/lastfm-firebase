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
import { Options as IntroOptions } from 'intro.js';
import isEmpty from 'lodash/isEmpty';
import isError from 'lodash/isError';
import property from 'lodash/property';
import { stringify } from 'query-string';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagPreview from '../components/TagPreview';
import useIntro from '../hooks/use-intro';
import usePageNumber from '../hooks/use-page-number';
import useTags from '../hooks/use-tags';
import { DEFAULT_TAGS_LIMIT } from '../misc/constants';
import { Tag } from '../misc/types';
import { acquireTags } from '../redux/actions/tags';
import { RootState } from '../redux/reducers';

import 'intro.js/introjs.css';

const LIST_GRID_CONFIG: ListProps<Tag>['grid'] = {
  gutter: 24,
  lg: 3,
  md: 3,
  sm: 1,
  xl: 4,
  xs: 1,
  xxl: 6,
};

const INTRO_OPTIONS: IntroOptions = {
  scrollToElement: true,
  steps: [
    {
      intro:
        "Welcome to Lastfm Analysis. My name is Vitalii Perehonchuk, here's my tiny pet project analyzing LastFM music data and basically collecting top music releases. Take this tiny tour.",
    },
    {
      element: '#tags-list',
      intro:
        "Here's the list of tags for which charts are available. Use pagination to see more.",
      position: 'top',
    },
    {
      element: '.tag-list-item:first-of-type',
      intro: "(Link) Here's a card of a tag.",
      position: 'right',
    },
    {
      element: '.reliable:first-of-type',
      intro:
        'This tiny tick denotes that albums were fully scraped for this tag and the list can be trusted.',
    },
    {
      element: '.tag-image-preview:first-of-type',
      intro: "Here are album covers depicting what's inside",
      position: 'top',
    },
    {
      element: '.tag-name:first-of-type',
      intro: 'Here is the name of a tag',
    },
    {
      element: '#stats-link',
      intro:
        '(Link) Go here to see some stats about the overall processing progress.',
      position: 'left',
    },
  ],
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
      disabled: total <= DEFAULT_TAGS_LIMIT || isLoading,
      onChange: (nextPage) => {
        dispatch(push(`/?${stringify({ page: nextPage })}`));
      },
      pageSize: DEFAULT_TAGS_LIMIT,
      position: 'both',
      showSizeChanger: false,
      showTitle: true,
      total,
    }),
    [dispatch, isLoading, pageNumber, total],
  );
  const handleRefresh = useCallback(() => {
    dispatch(acquireTags(DEFAULT_TAGS_LIMIT * (pageNumber - 1)));
  }, [dispatch, pageNumber]);
  const intro = useIntro('homePage', INTRO_OPTIONS);
  const takeTour = useCallback(() => intro.start(), [intro]);
  useEffect(() => {
    if (!isEmpty(tags) && !localStorage.getItem(`intro:homePage`)) {
      takeTour();
    }
  }, [tags, takeTour]);
  return (
    <Layout id="home-page">
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
              disabled={isLoading}
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
            <Button disabled={isLoading} onClick={takeTour} type="primary">
              Take a tour
            </Button>
          </Space>
        }
        id="tags-list"
        loading={isLoading}
        pagination={pagination}
        renderItem={renderTag}
        rowKey="name"
        size="large"
      />
    </Layout>
  );
}
