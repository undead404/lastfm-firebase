import { Layout } from 'antd';

import './App.css';
import ApplicationHeader from './components/ApplicationHeader';

import RouteSwitch from './components/RouteSwitch';

function App(): JSX.Element {
  return (
    <Layout>
      <ApplicationHeader />
      <Layout.Content>
        <RouteSwitch />
      </Layout.Content>
      <Layout.Footer>Vitalii Perehonchuk, 2021</Layout.Footer>
    </Layout>
  );
}

export default App;
