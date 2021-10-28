import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);