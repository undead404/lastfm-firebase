import { Layout, PageHeader } from 'antd';
import { Route, Switch } from 'react-router';

import './App.css';
import Link from './components/Link';
import Home from './pages/Home';
import TagPage from './pages/Tag';

function App(): JSX.Element {
  return (
    <Layout>
      <Layout.Header>
        <PageHeader title={<Link href="/">LastFM analysis</Link>} />
      </Layout.Header>
      <Layout.Content>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/tag/:tagName">
            <TagPage />
          </Route>
        </Switch>
      </Layout.Content>
      <Layout.Footer>Vitalii Perehonchuk, 2021</Layout.Footer>
    </Layout>
  );
}

export default App;
