import React from 'react';
import { mount } from 'enzyme';
import createWithUserThemes from './createWithUserThemes';

describe('withUserThemes', () => {
  const ThemeableComponent = ({ theme }) => (
    <div>
      <span className={theme.testClass}>Content One</span>
      <span className={theme.testClass2}>Content Two</span>
    </div>
  );
  const userThemes = {
    theme1: {
      testClass: 'theme1__testClass__12345',
      testClass2: 'theme1__testClass2__asdfg',
    },
    theme2: {
      testClass: 'theme2__testClass__34567',
      testClass2: 'theme2__testClass2__qwert',
    },
  };
  const ThemedComponent = createWithUserThemes(ThemeableComponent)(userThemes);

  it('Should use a themeMap and themeName provided by a user', () => {
    const wrapper = mount(<ThemedComponent themeName="theme1" />);
    expect(wrapper.contains([
      <span className="theme1__testClass__12345">Content One</span>,
      <span className="theme1__testClass2__asdfg">Content Two</span>,
    ])).toBe(true);
  });
});
