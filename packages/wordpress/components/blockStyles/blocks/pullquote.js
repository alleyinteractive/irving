import { css } from 'styled-components';
import { link } from './utils';

/* eslint-disable indent */
export const pullquoteBlock = css`

  .wp-block-pullquote {
    display: flex;
    padding: 1rem 1.5rem;
    text-align: left;

    &::before {
      color: #AAAAAA;
      content: '“';
      font-family: "Times New Roman", "Times", serif;
      font-size: 4rem;
      font-weight: 700;
      margin-right: 1.5rem;
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
