import React from 'react'
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import defaultState from '../packages/core/reducers/defaultState';

const render = (component, opts = {}) => {
  const {
    reducer,
    initialState = {},
    renderOptions,
  } = opts;
  const defaultReducer = (state) => state;
  const store = createStore(
    reducer || defaultReducer,
    { ...defaultState, ...initialState }
  );
  const Wrapper = ({ children }) => ( // eslint-disable-line react/prop-types
    <Provider store={store}>
      {children}
    </Provider>
  );

  return rtlRender(
    component,
    {
      wrapper: Wrapper,
      ...renderOptions,
    }
  );
};

export default render;
