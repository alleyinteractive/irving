import React from 'react';
import {
  render,
  screen,
  fireEvent
} from '@testing-library/react';
import Button from '.';

it('<Button /> renders children components', () => {
  render(<Button>foo</Button>);
  expect(screen.getByText('foo')).toBeInTheDocument();
});

it('<Button /> renders the correct tag', () => {
  const { container } = render(<Button>foo</Button>);
  expect(container.querySelector('button')).toBeInTheDocument();
});

it('<Button /> renders a custom tag', () => {
  const { container } = render(<Button tag="a">foo</Button>);
  expect(container.querySelector('a')).toBeInTheDocument();
});

it('<Button /> onClick event triggers correctly', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>foo</Button>);
  fireEvent.click(screen.getByText('foo'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
