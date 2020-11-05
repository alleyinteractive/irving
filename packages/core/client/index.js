import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import browserStorage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import set from 'lodash/fp/set';
import { actionLocationChange } from 'actions';
import Cookies from 'universal-cookie';
import App from 'components/app';
import { getValueFromConfig } from 'config/irving/getValueFromConfig';
import preloadedStateDenylist from 'config/preloadedStateDenylist';
import rootReducer from 'reducers';
import defaultState from 'reducers/defaultState';
import rootSaga from 'sagas';
import history from 'utils/history';
import getEnv from 'utils/universalEnv';
import debug from 'debug';

const env = getEnv();
console.log(env);
if (env.DEBUG) {
  debug.enable(env.DEBUG);
}

const cookies = new Cookies();
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
const preloadedState = window.__PRELOADED_STATE__ || defaultState; // eslint-disable-line no-underscore-dangle

// Rehydrate denylisted keys (like cookies, yum).
const unsetConfigs = getValueFromConfig(
  'preloadedStateDenylist',
  preloadedStateDenylist
);
const rehydratedState = unsetConfigs.reduce(
  (acc, config) => set(
    config.key,
    config.rehydrationFunction(),
    acc
  ),
  preloadedState
);

// Persist state.
const persistConfig = {
  key: 'root',
  storage: browserStorage,
  whitelist: [], // add state slices you do not want persisted here
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, rehydratedState, enhancer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

history.listen((location, action) => {
  store.dispatch(actionLocationChange(
    action,
    {
      ...location,
      cookie: cookies.getAll({ doNotParse: true }),
    }
  ));
});

const render = () => {
  const rootEl = document.getElementById('root');
  // It is imperative that the server React component tree matches the client
  // component tree, so that the client can re-hydrate the app from the server
  // rendered markup, otherwise the app will be completely re-rendered.
  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
};

// Wait for the Redux state to be re-hydrated before rendering the app.
// We don't use the redux-persist/PersistGate component, because it doesn't play
// nice with server side rendering.
const waitForPersistor = () => (
  new Promise((resolve) => {
    const unsubscribe = persistor.subscribe(() => {
      const isReady = persistor.getState().bootstrapped;

      if (isReady) {
        resolve();
        unsubscribe();
      }
    });
  })
);

// Collect functions defining conditions to wait for before rendering the client-side application
const waitForClientRender = getValueFromConfig(
  'waitForClientRender',
  [waitForPersistor]
);

Promise.all(waitForClientRender.map((waitFunc) => waitFunc()))
  .then(() => render());
