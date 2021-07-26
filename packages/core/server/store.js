import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import browserStorage from 'redux-persist/lib/storage';
import rootReducer from 'reducers';
import defaultState from 'reducers/defaultState';
import rootSaga from 'sagas';
import isNode from 'utils/isNode';

// Persist state.
const persistConfig = {
  key: 'root',
  storage: browserStorage,
  whitelist: [], // add state slices you do not want persisted here
};

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  if (isNode()) {
    return createStore(
      rootReducer,
      defaultState,
      applyMiddleware(sagaMiddleware),
    );
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(persistedReducer, defaultState, enhancer);

  // set up persistor and saga.
  store.sagaTask = sagaMiddleware.run(rootSaga);
  store.__persistor = persistStore(store);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
