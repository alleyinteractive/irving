import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeContext from './themeContext';
import withThemes from './withThemes';

describe('withThemes', () => {
  const ThemeableComponent = ({ theme }) => (
    <div>
      <span data-testid={theme.testClass}>Foo</span>
      <span data-testid={theme.testClass2}>Bar</span>
    </div>
  );
  const testThemes = {
    default: {
      testClass: 'default__testClass__01234',
      testClass2: 'default__testClass2___ghjkl',
    },
    theme1: {
      testClass: 'theme1__testClass__12345',
      testClass2: 'theme1__testClass2___asdfg',
    },
    theme2: {
      testClass: 'theme2__testClass__34567',
      testClass2: 'theme2__testClass2___qwert',
    },
  };
  const ThemedComponent = withThemes('Foo', testThemes)(ThemeableComponent);
  const ThemedComponentComposes = withThemes('Foo', testThemes, true)(ThemeableComponent);

  it('Should use the default theme if no theme is specified', () => {
    render(<ThemedComponent />);

    const el1 = screen.getByTestId('default__testClass__01234');
    const el2 = screen.getByTestId('default__testClass2___ghjkl');

    expect(el1.textContent).toBe('Foo');
    expect(el2.textContent).toBe('Bar');
  });

  it('Should get a `contextThemes` value from context and provide the specified theme to the component as a prop', () => {
    render(
      <ThemeContext.Provider value={{ Foo: 'theme1' }}>
        <ThemedComponent />
      </ThemeContext.Provider>
    );
    const el1 = screen.getByTestId('theme1__testClass__12345');
    const el2 = screen.getByTestId('theme1__testClass2___asdfg');

    expect(el1.textContent).toBe('Foo');
    expect(el2.textContent).toBe('Bar');
  });

  it('Should render a component with a theme provided directly to the `themeName` prop', () => {
    render(<ThemedComponent themeName="theme2" />);
    const el1 = screen.getByTestId('theme2__testClass__34567');
    const el2 = screen.getByTestId('theme2__testClass2___qwert');

    expect(el1.textContent).toBe('Foo');
    expect(el2.textContent).toBe('Bar');
  });

  it('Should combine classNames of provided theme and default if `composes` is set to `true`', () => {
    render(<ThemedComponentComposes themeName="theme1" />);
    const el1 = screen.getByTestId(
      'default__testClass__01234 theme1__testClass__12345'
    );
    const el2 = screen.getByTestId(
      'default__testClass2___ghjkl theme1__testClass2___asdfg'
    );

    expect(el1.textContent).toBe('Foo');
    expect(el2.textContent).toBe('Bar');
  });

  it('Should utilize a theme provided directly via a `theme` prop first instead of any theme derived from context or `themeName`', () => {
    render(
      <ThemedComponent
        themeName="theme1"
        theme={{
          testClass: 'default__testClass__56789',
          testClass2: 'default__testClass2___lalala',
        }}
      />
    );
    const el1 = screen.getByTestId('default__testClass__56789');
    const el2 = screen.getByTestId('default__testClass2___lalala');

    expect(el1.textContent).toBe('Foo');
    expect(el2.textContent).toBe('Bar');
  });
});
