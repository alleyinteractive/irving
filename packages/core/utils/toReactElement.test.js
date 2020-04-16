import { shallow } from 'enzyme';
import toReactElement from './toReactElement';

describe('toReactElement', () => {
  const apiComponent = {
    name: 'foo',
    config: {
      color: 'red',
    },
    children: [],
  };

  const apiComponent2 = {
    name: 'baz',
    config: {},
    children: [],
  };

  const apiComponent3 = {
    name: 'buzz',
    config: {},
    children: [],
  };

  it( 'converts an api component to a React element', () => {
    const fooElement = toReactElement(apiComponent);
    const wrapper = shallow(<div>{fooElement}</div>);

    expect(wrapper.find({ componentName: 'foo' })).toHaveLength(1);
    expect(wrapper.find({ color: 'red' })).toHaveLength(1);
  });

  it( 'converts api component\'s children to React elements', () => {
    const componentWithChildren = {
      ...apiComponent,
      children: [apiComponent2, apiComponent3]
    };

    const element = toReactElement(componentWithChildren);
    const wrapper = shallow(<div>{element}</div>);

    expect(wrapper.find({ componentName: 'baz' })).toHaveLength(1);
    expect(wrapper.find({ componentName: 'buzz' })).toHaveLength(1);
  });

  it( 'converts api component\'s component groups to React elements', () => {
    const componentWithGroups = {
      name: 'bar',
      config: {},
      children: [],
      componentGroups: {
        group1: [apiComponent2],
        group2: [apiComponent3],
      },
    };

    const element = toReactElement(componentWithGroups);
    const wrapper = shallow(<div>{element}</div>);

    expect(
      wrapper.find({ componentName: 'bar' })
        .dive()
        .find({ componentName: 'baz' })
    ).toHaveLength(1);
    expect(
      wrapper.find({ componentName: 'bar' })
        .dive()
        .find({ componentName: 'buzz' })
    ).toHaveLength(1);
  });
});
