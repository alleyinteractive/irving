import React from 'react';
import { mount } from 'enzyme';
import ThemeProvider from '../ThemeProvider';
import withThemes from './';

describe('withThemes', () => {
  const ThemeableComponent = ({ theme }) => (
    <div>
      <span className={theme.testClass}>Foo</span>
      <span className={theme.testClass2}>Bar</span>
    </div>
  );
  const testThemes = {
    defaultTheme: {
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
    const wrapper = mount(<ThemedComponent />);
    expect(wrapper.contains([
      <span className="default__testClass__01234">Foo</span>,
      <span className="default__testClass2___ghjkl">Bar</span>,
    ])).toBe(true);
  });

  it('Should get a `themes` property from context and provide the specified theme to the component as a prop', () => {
    const wrapper = mount(
      <ThemeProvider themes={{ Foo: 'theme1' }}>
        <ThemedComponent />
      </ThemeProvider>
    );
    expect(wrapper.contains([
      <span className="theme1__testClass__12345">Foo</span>,
      <span className="theme1__testClass2___asdfg">Bar</span>,
    ])).toBe(true);
  });

  it('Should render a component with a theme provided directly to the `useTheme` prop', () => {
    const wrapper = mount(
      <ThemedComponent useTheme="theme2" />
    );
    expect(wrapper.contains([
      <span className="theme2__testClass__34567">Foo</span>,
      <span className="theme2__testClass2___qwert">Bar</span>,
    ])).toBe(true);
  });

  it('Should combine classNames of provided theme and defaultTheme if `composes` is set to `true`', () => {
    const wrapper = mount(
      <ThemedComponentComposes useTheme="theme1" />
    );
    expect(wrapper.contains([
      <span className="theme1__testClass__12345 default__testClass__01234">Foo</span>,
      <span className="theme1__testClass2___asdfg default__testClass2___ghjkl">Bar</span>,
    ])).toBe(true);
  });
});
