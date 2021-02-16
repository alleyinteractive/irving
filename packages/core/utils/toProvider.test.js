import React from 'react';
import { render, screen } from '@testing-library/react';
import toProvider from './toProvider';

describe('toProvider', () => {
  it('converts a name, config, and children to a provider component', () => {
    render(
      <div>
        {toProvider(
          'irving/test-provider',
          { color: 'red' },
          (<div>(and a child)</div>)
        )}
      </div>
    );
    const element = screen.getByTestId('provider');
    expect(element.textContent).toBe('I am a provider(and a child)');
  });

  it('Still renders children with a default provider if no component configured in componentMap', () => {
    render(
      <div data-testid="provider">
        {toProvider(
          'irving/does-not-exist',
          {},
          (<div>i still render children</div>)
        )}
      </div>
    );
    const element = screen.getByTestId('provider');
    expect(element.textContent).toBe('i still render children');
  });
});
