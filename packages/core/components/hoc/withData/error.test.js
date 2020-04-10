import React from 'react';
import { mount } from 'enzyme';
import DataError from './error';

describe('DataError', () => {
  it('Should return a div with an error message', () => {
    const wrapper = mount(<DataError />);
    expect(wrapper.text()).toEqual('error...');

    expect(wrapper.contains([<div>error...</div>])).toBe(true);
  });
});
