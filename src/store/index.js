import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';

import thunkMiddleware from './utils/thunk-middleware';
import * as catalogs from './reducers'

const reducers = {
  [catalogs.storeKey]: catalogs.reducer,
};

const store = createStore(
  combineReducers(reducers),
  undefined,
  compose(applyMiddleware(thunkMiddleware)),
);

export default store;



