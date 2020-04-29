import React from 'react';
import { mount } from 'enzyme';
import styled from 'styled-components';
import createWithUserThemes from './createWithUserThemes';

describe('withUserThemes', () => {
  const ThemeableComponent = ({ theme }) => {
    const {
      Wrapper,
      ContentItem,
    } = theme;

    return (
      <Wrapper>
        <ContentItem>Content One</ContentItem>
        <ContentItem>Content Two</ContentItem>
      </Wrapper>
    );
  };
  const userThemes = {
    default: {
      Wrapper: styled.div`
        background-color: blue;
      `,
      ContentItem: styled.span`
        color: green;
      `,
    },
    theme1: {
      Wrapper: styled.div`
        background-color: orange;
      `,
      ContentItem: styled.span`
        color: black;
      `,
    },
  };
  const ThemedComponent = createWithUserThemes(ThemeableComponent)(userThemes);

  it('Should use a themeMap and themeName provided by a user', () => {
    const wrapper = mount(<ThemedComponent themeName="theme1" />);

    expect(
      wrapper.exists(`.${userThemes.theme1.Wrapper.styledComponentId}`)
    ).toBe(true);
    expect(
      wrapper.exists(`.${userThemes.theme1.ContentItem.styledComponentId}`)
    ).toBe(true);
  });

  it('Should override default with user theme if a default key is used in user themeMap', () => {
    const wrapper = mount(<ThemedComponent />);

    expect(
      wrapper.exists(`.${userThemes.default.Wrapper.styledComponentId}`)
    ).toBe(true);
    expect(
      wrapper.exists(`.${userThemes.default.ContentItem.styledComponentId}`)
    ).toBe(true);
  });
});
