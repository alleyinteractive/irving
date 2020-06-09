import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Fragment from './fragment';

describe('<Fragment />', () => {
  it('renders children components', () => {
    const fragment = shallow(<Fragment>Foo Bar</Fragment>);
    expect(fragment.text()).to.equal('Foo Bar');
  });

  it('renders the correct tag', () => {
    const fragment = shallow(<Fragment tag="section">Foo Bar</Fragment>);
    expect(fragment.type()).to.equal('section');
  });
});
