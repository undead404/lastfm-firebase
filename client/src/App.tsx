import { Layout, PageHeader, Typography } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Tag from './pages/Tag';

function App(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Layout.Header>
          <PageHeader
            title={
              <Link component={Typography.Link} to="/">
                LastFM analysis
              </Link>
            }
            subTitle="This is a subtitle"
          />
        </Layout.Header>
        <Layout.Content>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/tag/:tagName">
              <Tag />
            </Route>
          </Switch>
        </Layout.Content>
        <Layout.Footer>Vitalii Perehonchuk, 2021</Layout.Footer>
      </Layout>
    </Router>
  );
}

export default App;
