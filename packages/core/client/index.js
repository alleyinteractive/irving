import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import browserStorage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { actionLocationChange } from 'actions';
import set from 'lodash/fp/set';
import Cookies from 'universal-cookie';
import App from 'components/app';
import rootReducer from 'reducers';
import defaultState from 'reducers/defaultState';
import rootSaga from 'sagas';
import history from 'utils/history';
import debug from 'debug';

if (process.env.DEBUG) {
  debug.enable(process.env.DEBUG);
}

const cookies = new Cookies();
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
const preloadedState = window.__PRELOADED_STATE__ || defaultState; // eslint-disable-line no-underscore-dangle
const state = set(
  'route.cookie',
  cookies.getAll({ doNotParse: true }),
  preloadedState
);

const persistConfig = {
  key: 'root',
  storage: browserStorage,
  whitelist: [], // add state slices you do not want persisted here
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, state, enhancer);
const persistor = persistStore(store);
const rootEl = document.getElementById('root');

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
const unsubscribe = persistor.subscribe(() => {
  const isReady = persistor.getState().bootstrapped;
  if (isReady) {
    render();
    unsubscribe();
  }
});
