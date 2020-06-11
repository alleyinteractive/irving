import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import reduceReducers from 'reduce-reducers';
import createSagaMiddleware from 'redux-saga';
import { reducers } from '@irvingjs/core/reducers';
import rootSaga from '@irvingjs/core/sagas';
import defaultState, {
  componentData,
} from '@irvingjs/core/reducers/defaultState';
import componentsReducer from '@irvingjs/core/reducers/componentsReducer';

const sagaMiddleware = createSagaMiddleware();

// Combine reducers, including testing reducers.
const rootSliceReducer = combineReducers({
  ...reducers,
});
// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer, componentsReducer);

const store = createStore(
  rootReducer,
  {
    ...defaultState,
    componentData,
    loading: true,
    components: {
      defaults: [],
      page: {
        '/': [
          {
            name: 'body',
            config: {
              name: 'body',
            },
            children: [],
          },
        ],
      },
    },
    route: {
      pathname: '/',
    },
  },
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

const Wrapper = (props) => {
  const { children } = props;
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Wrapper;
