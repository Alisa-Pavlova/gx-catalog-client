import React from 'react'
import {
  withRouter,
  Switch,
  Route,
} from 'react-router-dom'

import HomePage from './pages/index.js'
import ItemPage from './pages/item-page.js'
import CreateCatalogPage from './pages/create-catalog'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/catalog/create" component={CreateCatalogPage} />
    <Route path="/catalog/:id">
      <ItemPage />
    </Route>
  </Switch>
)

export default withRouter(App)
