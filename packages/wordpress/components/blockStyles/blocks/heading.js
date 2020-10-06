import { css, createGlobalStyle } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';
import { link } from './utils';

/* eslint-disable indent */
const heading = css`
  color: ${siteTheme('blocks.heading.color', '#000000')};
  font-family: ${siteTheme(
    'blocks.heading.fontFamily',
    'Arial, Helvetica, sans-serif'
  )};
  font-size: ${siteTheme('blocks.heading.fontSize', '1rem')};
  font-weight: ${siteTheme('blocks.heading.fontWeight', '700')};
  line-height: ${siteTheme('blocks.heading.lineHeight', '1.3')};

  a {
    ${link};
  }
`;

export const HeadingBlock = createGlobalStyle`
  [data-type="core/heading"] {
    ${heading}
  }

  .irving__post-content {

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      ${heading}
    }
  }

  h1[data-type="core/heading"],
  .irving__post-content h1 {
    font-size: ${siteTheme('blocks.heading.sizes.h1', '2.25rem')};
  }

  h2[data-type="core/heading"],
  .irving__post-content h2 {
    font-size: ${siteTheme('blocks.heading.sizes.h2', '2rem')};
  }

  h3[data-type="core/heading"],
  .irving__post-content h3 {
    font-size: ${siteTheme('blocks.heading.sizes.h3', '1.75rem')};
  }

  h4[data-type="core/heading"],
  .irving__post-content h4 {
    font-size: ${siteTheme('blocks.heading.sizes.h4', '1.5rem')};
  }

  h5[data-type="core/heading"],
  .irving__post-content h5 {
    font-size: ${siteTheme('blocks.heading.sizes.h5', '1.25rem')};
  }

  h6[data-type="core/heading"],
  .irving__post-content h6 {
    font-size: ${siteTheme('blocks.heading.sizes.h6', '1rem')};
  }
`;
