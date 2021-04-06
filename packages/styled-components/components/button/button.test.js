import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '.';

describe('<Button />', () => {
  it('renders children components', () => {
    render(<Button>foo</Button>);
    expect(screen.getByText('foo')).toBeInTheDocument();
  });

  it('renders the correct tag', () => {
    const { container } = render(<Button>foo</Button>);
    expect(container.querySelector('button')).toBeInTheDocument();
  });
});
