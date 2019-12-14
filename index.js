/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleWare = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware)),
);

const appRedux = () => (
  <Provider store={createStoreWithMiddleWare}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => appRedux);
