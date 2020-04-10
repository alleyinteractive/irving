import React from 'react';
import { mount } from 'enzyme';
import DataLoading from './loading';

describe('DataLoading', () => {
  it('Should return a div with a loading message', () => {
    const wrapper = mount(<DataLoading />);

    expect(wrapper.text()).toEqual('loading...');

    expect(wrapper.contains([<div>loading...</div>])).toBe(true);
  });
});
