import React from 'react'
import {
  withRouter,
  Switch,
  Route,
} from 'react-router-dom'

import HomePage from './pages/index.js'
import ItemPage from './pages/item-page.js'
import CreateCatalogPage from './pages/create-catalog'
import UpdateCatalogPage from './pages/update-catalog'
import CreateItemPage from './pages/create-item'
import UpdateItemPage from './pages/update-item'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/catalog/create" component={CreateCatalogPage} />
    <Route exact path="/catalog/:id/create">
      <CreateItemPage />
    </Route>
    <Route exact path="/catalog/:id/update">
      <UpdateCatalogPage />
    </Route>
    <Route exact path="/catalog/:catalogId/update/:id">
      <UpdateItemPage />
    </Route>
    <Route path="/catalog/:id">
      <ItemPage />
    </Route>
  </Switch>
)

export default withRouter(App)
