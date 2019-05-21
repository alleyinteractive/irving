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
import { StyleContext, CriticalCssBuilder } from 'critical-style-loader/lib';
import { reducers } from 'reducers';
import rootSaga from 'sagas';
import defaultState, { form, componentData } from 'reducers/defaultState';
import componentsReducer from 'reducers/componentsReducer';
import createFormReducer from 'reducers/createFormReducer';
import createComponentDataReducer from 'reducers/createComponentDataReducer';

const sagaMiddleware = createSagaMiddleware();

// Combine reducers, including testing reducers.
const rootSliceReducer = combineReducers({
  ...reducers,
  testForm: createFormReducer('testForm'),
  asyncComponentData: createComponentDataReducer('asyncComponentData'),
  externalComponentData: createComponentDataReducer('externalComponentData'),
});
// "State" reducers are composed together. The order they are passed into
// reduceReducers determines the order they will be run in.
const rootReducer = reduceReducers(rootSliceReducer, componentsReducer);

const store = createStore(
  rootReducer,
  {
    ...defaultState,
    asyncComponentData: componentData,
    externalComponentData: componentData,
    testForm: form,
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
// Container for critical css related to this page render.
const cssBuilder = new CriticalCssBuilder();

const Wrapper = (props) => {
  const { children } = props;
  return (
    <Provider store={store}>
      <StyleContext.Provider value={cssBuilder.addCss}>
        {children}
      </StyleContext.Provider>
    </Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Wrapper;
