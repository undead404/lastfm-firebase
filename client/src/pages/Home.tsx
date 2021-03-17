import { Alert, Col, List, Row, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import getProcessedTagNames from '../https-callables/get-processed-tag-names';

export default function Home(): JSX.Element {
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [tagNames, setTagNames] = useState<string[]>([]);
  useEffect(() => {
    setIsLoading(true);
    getProcessedTagNames()
      .then(setTagNames)
      .finally(() => setIsLoading(false))
      .catch(setError);
  }, []);
  const renderTagName = useCallback(
    (item: string) => (
      <List.Item>
        <Link component={Typography.Link} to={`/tag/${item}`}>
          {item}
        </Link>
      </List.Item>
    ),
    [],
  );
  if (isLoading) {
    return (
      <Row gutter={16}>
        <Col>
          <Spin tip="Loading..." />
        </Col>
      </Row>
    );
  }
  return (
    <>
      {error && <Alert message={error.message} type="error" />}
      <List
        header={<div>Available tags</div>}
        footer={<div>More coming</div>}
        bordered
        dataSource={tagNames}
        renderItem={renderTagName}
      />
    </>
  );
}
