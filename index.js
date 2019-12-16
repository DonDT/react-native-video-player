/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './src/store/reducers/index';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

const reducer = storage.reducer(reducers);

const engine = createEngine('my-save-key');

const middleware = storage.createMiddleware(engine);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(middleware))(
  createStore,
);

const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);

load(store);

const appRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => appRedux);
