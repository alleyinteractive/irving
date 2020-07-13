import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Fragment from './';

describe('<Fragment />', () => {
  it('renders children components', () => {
    render(<Fragment children={['Foo Bar']} />);
    expect(screen.getByText('Foo Bar')).toBeInTheDocument();
  });

  it('renders the correct tag', () => {
    const { container } = render(<Fragment tag="h1" children={['Foo Bar']} />);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('renders the correct role', () => {
    render(<Fragment tag="h3" children={['Foo Bar']} />);
    expect(screen.getByRole('heading', { name: 'Foo Bar'})).toBeInTheDocument();
  });
});
