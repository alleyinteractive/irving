import { createGlobalStyle } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';
import { link } from './utils';

/* eslint-disable indent */
export const QuoteBlock = createGlobalStyle`
  .wp-block-quote {
    border-left: ${siteTheme(
      'blocks.quote.borderLeft',
      '4px solid black'
    )};
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 2rem;
    padding-left: 2rem;
    text-align: left;

    &.is-large,
    &.is-style-large {
      padding: 0;
    }

    p {
      color: ${siteTheme('blocks.quote.color', '#000000')};
      font-family: ${siteTheme(
        'blocks.quote.fontFamily',
        'Arial, Helvetica, sans-serif'
      )};
      font-size: ${siteTheme('blocks.quote.fontSize', '1rem')};
      font-weight: ${siteTheme('blocks.quote.fontWeight', '400')};
    }

    cite {
      display: inline-block;
      color: ${siteTheme('blocks.quote.cite.color', '#000000')};
      font-family: ${siteTheme(
        'blocks.quote.cite.fontFamily',
        'Times, Georgia, serif'
      )};
      font-size: ${siteTheme('blocks.quote.cite.fontSize', '0.75rem')};
      font-weight: ${siteTheme('blocks.quote.cite.fontWeight', '400')};
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
