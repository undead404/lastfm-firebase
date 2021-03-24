import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

import SuspenseFallback from './SuspenseFallback';

const Home = lazy(() => import('../pages/Home'));
const Stats = lazy(() => import('../pages/Stats'));
const TagPage = lazy(() => import('../pages/Tag'));

const suspenseFallback = <SuspenseFallback />;
export default function RouteSwitch(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/">
        <Suspense fallback={suspenseFallback}>
          <Home />
        </Suspense>
      </Route>
      <Route exact path="/stats">
        <Suspense fallback={suspenseFallback}>
          <Stats />
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
