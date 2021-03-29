import { Layout, PageHeader } from 'antd';

import Link from './Link';

export default function ApplicationHeader(): JSX.Element {
  return (
    <Layout.Header>
      <PageHeader
        extra={
          <Link href="/stats" id="stats-link">
            Stats
          </Link>
        }
        title={<Link href="/">LastFM analysis</Link>}
      />
    </Layout.Header>
  );
}
