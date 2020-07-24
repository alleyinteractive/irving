import React from 'react';
import { screen } from '@testing-library/react';
import render from '../../../../test/test-utils';
import Loader from '.';

it('should skip rendering wrapped component if loading', () => {
  const LoaderComponent = () => (
    <Loader>
      <div>foo</div>
    </Loader>
  );

  render(
    <LoaderComponent />,
    {
      initialState: { loading: true },
    }
  );

  const loadingComponent = screen.getByTestId('loading');
  expect(loadingComponent.children[0].outerHTML).toBe('<svg></svg>');
});

it('should render wrapped component if not loading', () => {
  const LoaderComponent = () => (
    <Loader>
      <div data-testid="foo">foo</div>
    </Loader>
  );

  render(
    <LoaderComponent />,
    {
      initialState: { loading: false },
    }
  );

  const contentComponent = screen.getByTestId('foo');
  expect(contentComponent.textContent).toBe('foo');
});

it('should render children if transition is disabled', () => {
  const LoaderComponent = () => (
    <Loader transition={{ enabled: false }}>
      <div data-testid="foo">foo</div>
    </Loader>
  );

  render(
    <LoaderComponent />,
    {
      initialState: { loading: false },
    }
  );

  const wrapperComponent = screen.getByTestId('wrapper');
  expect(wrapperComponent.textContent).toBe('foo');
});
