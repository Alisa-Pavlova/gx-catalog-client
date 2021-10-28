import * as catalogs from './catalogs'
import * as items from './items'

export const reducers = {
  [catalogs.storeKey]: catalogs.reducer,
  [items.storeKey]: items.reducer,
};
