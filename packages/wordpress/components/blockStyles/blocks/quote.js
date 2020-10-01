import { createGlobalStyle } from 'styled-components';
import { link } from './utils';

export const QuoteBlock = createGlobalStyle`
  .wp-block-quote {
    border-left: 4px solid #DDDDDD;
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
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 400;
      position: relative;
    }

    cite {
      display: inline-block;
      font-family: 'Times New Roman', Times, serif;
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
