import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Home = lazy(() => import('../pages/Home'));
const TagPage = lazy(() => import('../pages/Tag'));

const suspenseFallback = <Spin spinning></Spin>;
export default function RouteSwitch(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/">
        <Suspense fallback={suspenseFallback}>
          <Home />
        </Suspense>
      </Route>
      <Route path="/tag/:tagName">
        <Suspense fallback={suspenseFallback}>
          <TagPage />
        </Suspense>
      </Route>
    </Switch>
  );
}
