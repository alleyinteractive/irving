import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import defaultState from 'reducers/defaultState';
import DefaultLoading from 'components/helpers/defaultLoading';
import withLoader from './withLoader';

it('should skip rendering wrapped component if loading', () => {
  const mockState = { ...defaultState, loading: true };
  const store = createStore((state) => state, mockState);
  const Foo = () => <div>foo</div>;
  const ComponentWithLoader = withLoader(Foo);
  // @todo revisit these (and use shallow, hopefully) on future enzyme releases
  const wrapper = mount(
    <Provider store={store}>
      <ComponentWithLoader />
    </Provider>
  );

  expect(wrapper.find(DefaultLoading)).toHaveLength(1);
});

it('should render wrapped component if not loading', () => {
  const store = createStore((state) => state, defaultState);
  const Foo = () => <div>foo</div>;
  const ComponentWithLoader = withLoader(Foo);
  // @todo revisit these (and use shallow, hopefully) on future enzyme releases
  const wrapper = mount(
    <Provider store={store}>
      <ComponentWithLoader />
    </Provider>
  );

  expect(wrapper.find(Foo)).toHaveLength(1);
});
