import React from 'react';
import { render, screen } from '@testing-library/react';
import toReactElement from './toReactElement';

describe('toReactElement', () => {
  const apiComponent = {
    name: 'foo',
    config: {
      color: 'red',
    },
    children: [],
  };

  const apiComponent2 = {
    name: 'baz',
    config: {},
    children: [],
  };

  const apiComponent3 = {
    name: 'buzz',
    config: {},
    children: [],
  };

  const apiComponent4 = {
    name: 'bizz',
    '_alias': 'foo',
    config: {},
    children: [],
  };

  it( 'converts an api component to a React element', () => {
    render(
      <div data-testid="foo">
        {toReactElement(apiComponent)}
      </div>
    );
    const element = screen.getByTestId('foo');
    expect(element.textContent).toBe('foo');
  });

  it('converts api component\'s children to React elements', () => {
    const componentWithChildren = {
      ...apiComponent,
      children: [apiComponent2, apiComponent3],
    };

    render(
      <div data-testid="bar">
        {toReactElement(componentWithChildren)}
      </div>
    );

    const element = screen.getByTestId('bar');
    expect(element.textContent).toBe('foobazbuzz');
  });

  it( 'converts api component\'s component groups to React elements', () => {
    const componentWithGroups = {
      name: 'bar',
      config: {},
      children: [],
      componentGroups: {
        group1: [apiComponent2],
        group2: [apiComponent3],
      },
    };

    render(
      <div data-testid="baz">
        {toReactElement(componentWithGroups)}
      </div>
    );

    const element = screen.getByTestId('baz');

    expect(element.textContent).toBe('bazbuzz');
  });

  it( 'converts an api component\'s alias to a React element', () => {
    render(
      <div data-testid="buzz">
        {toReactElement(apiComponent4)}
      </div>
    );

    const element = screen.getByTestId('buzz');
    expect(element.textContent).toBe('foo');
  });
});
