import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Byline from './';

configure({adapter: new Adapter()});

describe('<Byline />', () => {
  it('should return nothing if no authors provided', () => {
    const authors = [];
    const wrapper = mount(<Byline children={authors} />);
    expect(wrapper.html()).toBe('');
  });

  it('should return one author if one author is provided', () => {
    const authors = ['Washington Irving'];
    const wrapper = mount(<Byline children={authors} />);
    const children = wrapper.find('div span');
    expect(children.length).toBe(3);
    expect(children.at(0).text()).toBe('By Washington Irving');
  });

  it('should return two authors if two authors provided', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving'];
    const wrapper = mount(<Byline children={authors} />);
    const children = wrapper.find('div span');
    expect(children.at(0).text()).toBe('By Washington Irving and Ebenezer Irving');
  });

  it('should return three authors if three authors provided', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving', 'Sarah Irving'];
    const wrapper = mount(<Byline children={authors} />);
    const children = wrapper.find('div span');
    expect(children.at(0).text()).toBe('By Washington Irving, Ebenezer Irving, and Sarah Irving');
  });

  it('should return four authors if four authors provided', () => {
    const authors = ['Washington Irving', 'Ebenezer Irving', 'Sarah Irving', 'William Irving Sr.'];
    const wrapper = mount(<Byline children={authors} />);
    const children = wrapper.find('div span');
    expect(children.at(0).text()).toBe('By Washington Irving, Ebenezer Irving, Sarah Irving, and William Irving Sr.');
  });

  it('should change preText if passed a preText prop', () => {
    const authors = ['Washington Irving'];
    const wrapper = mount(<Byline children={authors} preText={'Guest Author: '} />);
    const children = wrapper.find('div span');
    expect(children.at(0).text()).toBe('Guest Author: Washington Irving');
  });

  it('should add a class if passed a className prop', () => {
    const authors = ['Washington Irving'];
    const wrapper = mount(<Byline children={authors} className={'foo'} />);
    expect(wrapper.find('div.foo').exists()).toBe(true);
  });
});
