import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import ThemeContext from './themeContext';
import withThemes from './withThemes';

describe('withThemes', () => {
  const ThemeableComponent = ({ theme }) => (
    <div>
      <span className={theme.testClass}>Foo</span>
      <span className={theme.testClass2}>Bar</span>
    </div>
  );

  ThemeableComponent.propTypes = {
    theme: PropTypes.shape({
      testClass: PropTypes.string,
      testClass2: PropTypes.string,
    }).isRequired,
  };

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
  const ThemedComponentComposes = withThemes('Foo', testThemes, true)(
    ThemeableComponent
  );

  it('Should use the default theme if no theme is specified', () => {
    const wrapper = mount(<ThemedComponent />);
    expect(
      wrapper.contains([
        <span className="default__testClass__01234">Foo</span>,
        <span className="default__testClass2___ghjkl">Bar</span>,
      ])
    ).toBe(true);
  });

  // eslint-disable-next-line max-len
  it('Should get a `themes` property from context and provide the specified theme to the component as a prop', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={{ Foo: 'theme1' }}>
        <ThemedComponent />
      </ThemeContext.Provider>
    );
    expect(
      wrapper.contains([
        <span className="theme1__testClass__12345">Foo</span>,
        <span className="theme1__testClass2___asdfg">Bar</span>,
      ])
    ).toBe(true);
  });

  // eslint-disable-next-line max-len
  it('Should render a component with a theme provided directly to the `useTheme` prop', () => {
    const wrapper = mount(<ThemedComponent theme="theme2" />);
    expect(
      wrapper.contains([
        <span className="theme2__testClass__34567">Foo</span>,
        <span className="theme2__testClass2___qwert">Bar</span>,
      ])
    ).toBe(true);
  });

  // eslint-disable-next-line max-len
  it('Should combine classNames of provided theme and default if `composes` is set to `true`', () => {
    const wrapper = mount(<ThemedComponentComposes theme="theme1" />);
    expect(
      wrapper.contains([
        <span className="default__testClass__01234 theme1__testClass__12345">
          Foo
        </span>,
        <span
          className="default__testClass2___ghjkl theme1__testClass2___asdfg"
        >
          Bar
        </span>,
      ])
    ).toBe(true);
  });
});
