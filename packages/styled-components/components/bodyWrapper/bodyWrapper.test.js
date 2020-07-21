import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BodyWrapper from './';

describe('<BodyWrapper />', () => {
  it('renders children components', () => {
    render(<BodyWrapper children={['Foo Bar']} />);
    expect(screen.getByText('Foo Bar')).toBeInTheDocument();
  });

  it('renders the correct body classes', () => {
    render(<BodyWrapper bodyClasses={['Foo', 'Bar']} />);
    expect(screen.querySelector('body.Foo')).toBeInTheDocument();
    expect(screen.querySelector('body.Bar')).toBeInTheDocument();
  });

  // it('renders the correct role', () => {
  //   render(<BodyWrapper tag="h3" children={['Foo Bar']} />);
  //   expect(screen.getByRole('heading', { name: 'Foo Bar'})).toBeInTheDocument();
  // });
});
