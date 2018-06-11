import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import browserStorage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import App from 'components/app';
import CssProvider from 'components/hoc/CssProvider';
import defaultState from 'config/defaultState';
import rootReducer from 'reducers';
import rootSaga from 'sagas';
import { insertCss } from 'utils/css';

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
const state = window.__PRELOADED_STATE__ || defaultState; // eslint-disable-line no-underscore-dangle
const persistConfig = {
  key: 'root',
  storage: browserStorage,
  whitelist: ['environments', 'selectedEnvironment'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, state, enhancer);
const persistor = persistStore(store);
const rootEl = document.getElementById('root');

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssProvider insertCss={insertCss}>
        <App />
      </CssProvider>
    </PersistGate>
  </Provider>,
  rootEl
);
