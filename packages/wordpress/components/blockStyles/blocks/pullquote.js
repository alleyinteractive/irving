import { createGlobalStyle } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';
import { link } from './utils';

/* eslint-disable indent */
export const PullquoteBlock = createGlobalStyle`
  .wp-block-pullquote {
    display: flex;
    padding: 1rem 1.5rem;
    text-align: left;

    &::before {
      color: #AAAAAA;
      content: '“';
      font-family: 'Times New Roman', Times, serif;
      font-size: 4rem;
      font-weight: 700;
      margin-right: 1.5rem;
      margin-top: -5rem;
    }

    &:not(.is-style-solid-color) {
      background-color: #EEEEEE;
    }

    p {
      color: ${siteTheme('blocks.pullquote.color', '#000000')};
      font-family: ${siteTheme(
        'blocks.pullquote.fontFamily',
        'Arial, Helvetica, sans-serif'
      )};
      font-size: ${siteTheme('blocks.pullquote.fontSize', '1rem')};
      font-weight: ${siteTheme('blocks.pullquote.fontWeight', '400')};
    }

    cite {
      display: inline-block;
      color: ${siteTheme('blocks.pullquote.cite.color', '#000000')};
      font-family: ${siteTheme(
        'blocks.pullquote.cite.fontFamily',
        'Times, Georgia, serif'
      )};
      font-size: ${siteTheme('blocks.pullquote.cite.fontSize', '0.75rem')};
      font-weight: ${siteTheme('blocks.pullquote.cite.fontWeight', '400')};
      margin-top: 2rem;

      &::before {
        content: '-';
        display: inline-block;
        margin-right: 0.25rem;
      }
    }

    a {
      ${link};
    }
  }
`;
