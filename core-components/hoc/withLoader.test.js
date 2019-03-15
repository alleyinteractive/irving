import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import defaultState from 'reducers/defaultState';
import PlaceholderLoading from 'core-components/placeholderLoading';
import withLoader from './withLoader';

it('should skip rendering wrapped component if loading', () => {
  const mockState = { ...defaultState, loading: true };
  const store = createStore((state) => state, mockState);
  const Foo = () => <div>foo</div>;
  const ComponentWithLoader = withLoader(Foo);
  const wrapper = shallow(<ComponentWithLoader />, {
    context: { store },
  });

  expect(wrapper.dive().find(PlaceholderLoading)).toHaveLength(1);
});

it('should render wrapped component if not loading', () => {
  const store = createStore((state) => state, defaultState);
  const Foo = () => <div>foo</div>;
  const ComponentWithLoader = withLoader(Foo);
  const wrapper = shallow(<ComponentWithLoader />, {
    context: { store },
  });

  expect(wrapper.dive().find(Foo)).toHaveLength(1);
});
