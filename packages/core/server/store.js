import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { persistReducer, persistStore } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
// import browserStorage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
// import defaultState from '../reducers/defaultState';
import rootSaga from '../sagas';
import resolveComponents from '../sagas/resolveComponents';
import isNode from '../utils/isNode';

// Persist state.
// const persistConfig = {
//   key: 'root',
//   storage: browserStorage,
//   whitelist: [], // add state slices you do not want persisted here
// };

const bindMiddleware = (middleware) => {
  // Add devtools.
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  // set up persistor and saga.
  // store.__persistor = persistStore(store);
  // if (isNode()) {
  //   store.sagaTask = sagaMiddleware.run(resolveComponents);
  // } else {
  //   store.sagaTask = sagaMiddleware.run(rootSaga);
  // }
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
