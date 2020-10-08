import { createGlobalStyle } from 'styled-components';
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
    }

    &:not(.is-style-solid-color) {
      background-color: #EEEEEE;
    }

    p {
      color: #000000;
      font-family: Arial, Helvetica, sans-serif
      font-size: 1rem;
      font-weight: 400;
    }

    cite {
      display: inline-block;
      color: #000000;
      font-family: Times, Georgia, serif;
      font-size: 0.75rem;
      font-weight: 400;
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
