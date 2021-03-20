import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import history from '../misc/history';

import createRootReducer from './reducers';

const store = createStore(
  createRootReducer(history),
  applyMiddleware(routerMiddleware(history), thunk, logger),
);

export default store;
