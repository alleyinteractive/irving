import React from 'react';
import Fragment from './';

describe('<Fragment />', () => {
  it('renders children components', () => {
    const wrapper = mount(<Fragment children={['Foo Bar']} />);
    expect(wrapper.text()).toBe('Foo Bar');
  });


  it('renders the correct tag', () => {
    const wrapper = shallow(<Fragment tag="section" children={['Foo Bar']} />);
    expect(wrapper.render()[0].name).toBe('section');
  });
});
