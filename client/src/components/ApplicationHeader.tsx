import { Layout, PageHeader } from 'antd';

import Link from './Link';

export default function ApplicationHeader(): JSX.Element {
  return (
    <Layout.Header>
      <PageHeader title={<Link href="/">LastFM analysis</Link>} />
    </Layout.Header>
  );
}
