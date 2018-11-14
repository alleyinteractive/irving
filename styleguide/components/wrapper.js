import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyleContext, CriticalCssBuilder } from 'critical-style-loader/lib';
import rootReducer from 'reducers';
import defaultState, { form } from 'reducers/defaultState';

const store = createStore(
  rootReducer,
  {
    ...defaultState,
    test: form,
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
  }
);
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
