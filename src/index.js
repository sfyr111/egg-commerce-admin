import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { HashRouter } from 'react-router-dom'

import App from './App';
import reducers from './reducer'

import './common/stylus/index.styl';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
))

ReactDOM.render((
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'));
