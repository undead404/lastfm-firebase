import { Alert, Card, Col, Layout, Row, Spin, Typography } from 'antd';
import get from 'lodash/get';
import isError from 'lodash/isError';
import map from 'lodash/map';
import property from 'lodash/property';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VictoryContainer, VictoryPie } from 'victory';

import { Stats } from '../https-callables/get-stats';
import { acquireStats } from '../redux/actions/stats';
import { RootState } from '../redux/reducers';

const PIE_STYLE = {
  labels: {
    fill: 'white',
  },
};

export default function StatsPage(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(acquireStats());
  }, [dispatch]);
  const error = useSelector<RootState, Error | string>(property('stats.error'));
  const isLoading = useSelector<RootState, boolean>(
    property('stats.isLoading'),
  );
  const stats = useSelector<RootState, Stats | null>(property('stats.stats'));
  const tagsStatsByProcessing = useMemo(
    () =>
      map(get(stats, 'tags.byProcessing'), (count, key) => ({
        x: key,
        y: count,
      })),
    [stats],
  );
  const tagsStatsByListGeneration = useMemo(
    () =>
      map(get(stats, 'tags.byListGeneration'), (count, key) => ({
        x: key,
        y: count,
      })),
    [stats],
  );
  const albumsStatsByCover = useMemo(
    () =>
      map(get(stats, 'albums.byCover'), (count, key) => ({
        x: key,
        y: count,
      })),
    [stats],
  );
  const albumsStatsByDate = useMemo(
    () =>
      map(get(stats, 'albums.byDate'), (count, key) => ({
        x: key,
        y: count,
      })),
    [stats],
  );
  return (
    <Layout>
      <Layout.Header>
        <Typography.Title level={1}>Stats</Typography.Title>
      </Layout.Header>
      <Layout.Content>
        {error && (
          <Alert
            message={isError(error) ? error.message : error}
            type="error"
          />
        )}
        <Row gutter={24}>
          <Col lg={12} md={12} sm={12} xl={6} xs={24} xxl={6}>
            <Card bordered={false} title="Tags' stats by albums' scraping">
              <Spin spinning={isLoading}>
                <VictoryPie
                  colorScale="cool"
                  containerComponent={<VictoryContainer />}
                  data={tagsStatsByProcessing}
                  labelRadius={10}
                  style={PIE_STYLE}
                />
              </Spin>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={12} xl={6} xs={24} xxl={6}>
            <Card bordered={false} title="Tags' stats by lists' generation">
              <Spin spinning={isLoading}>
                <VictoryPie
                  colorScale="cool"
                  containerComponent={<VictoryContainer />}
                  data={tagsStatsByListGeneration}
                  labelRadius={25}
                  style={PIE_STYLE}
                />
              </Spin>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={12} xl={6} xs={24} xxl={6}>
            <Card
              bordered={false}
              title="Albums' stats by covers' availability"
            >
              <Spin spinning={isLoading}>
                <VictoryPie
                  colorScale="cool"
                  containerComponent={<VictoryContainer />}
                  data={albumsStatsByCover}
                  labelRadius={10}
                  style={PIE_STYLE}
                />
              </Spin>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={12} xl={6} xs={24} xxl={6}>
            <Card bordered={false} title="Albums' stats by dates' availability">
              <Spin spinning={isLoading}>
                <VictoryPie
                  colorScale="cool"
                  containerComponent={<VictoryContainer />}
                  data={albumsStatsByDate}
                  labelRadius={10}
                  style={PIE_STYLE}
                />
              </Spin>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
