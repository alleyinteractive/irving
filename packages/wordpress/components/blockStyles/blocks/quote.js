import { css } from 'styled-components';
import { link } from './utils';

/* eslint-disable indent, import/prefer-default-export */
export const quoteBlock = css`

  .wp-block-quote {
    border-left: 1px solid black;
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
      color: #000000;
      font-family: "Arial", "Helvetica", sans-serif;
      font-size: 1rem;
      font-weight: 400;
    }

    cite {
      color: #000000;
      display: inline-block;
      font-family: "Times", "Georgia", serif;
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
