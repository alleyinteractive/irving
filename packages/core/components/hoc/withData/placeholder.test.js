import React from 'react';
import { mount } from 'enzyme';
import DataPlaceholder from './placeholder';

describe('DataLoading', () => {
  it('Should return a div with some styles', () => {
    const wrapper = mount(<DataPlaceholder />);

    expect(wrapper.text()).toEqual('');
  });
});
