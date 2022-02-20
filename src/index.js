import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/app';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
// import { createStore } from 'redux';
// import reducer from './App/reducer/reducer';
import store from './App/store/store'

// const store = createStore(reducer)


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);