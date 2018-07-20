import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PlaceholderLoading from 'components/placeholderLoading';
import withLoader from './withLoader';

configure({ adapter: new Adapter() });

it('should skip rendering wrapped component if loading', () => {
  const Foo = () => <div>foo</div>;
  const ComponentWithLoader = withLoader(Foo);
  const wrapper = shallow(<ComponentWithLoader loading />);
  expect(wrapper.equals(<PlaceholderLoading />)).toBe(true);
});

it('should render wrapped component if not loading', () => {
  const Foo = () => <div>foo</div>;
  const ComponentWithLoader = withLoader(Foo);
  const wrapper = shallow(<ComponentWithLoader />);
  expect(wrapper.equals(<Foo />)).toBe(true);
});
