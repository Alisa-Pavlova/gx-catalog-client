import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';

import thunkMiddleware from './utils/thunk-middleware';

import { reducers } from './reducers';

const store = createStore(
  combineReducers(reducers),
  undefined,
  compose(applyMiddleware(thunkMiddleware)),
);

export default store;
