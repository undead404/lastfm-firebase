import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Tag from './pages/Tag';

function App(): JSX.Element {
  return (
    <Router>
      <p>
        <Link to="/">Home</Link>
      </p>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/tag/:tagName">
          <Tag />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
