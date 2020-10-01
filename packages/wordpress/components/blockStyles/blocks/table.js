import { createGlobalStyle } from 'styled-components';
import { bodyText, link, caption } from './utils';

export const TableBlock = createGlobalStyle`
  .wp-block-table {
    ${bodyText};

    thead {
      border-bottom: 4px solid #000000;
    }

    td,
    th {
      border-right: 1px solid #333333;
      padding: 0.25rem 0.5rem;
    }

    th {
      font-weight: 700;
    }

    tr {
      border: 1px solid #333333;
    }

    a {
      ${link};
    }

    figcaption {
      ${caption};
      margin-top: 0.5rem;
    }
  }
`;
