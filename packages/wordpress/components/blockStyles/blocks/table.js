import { css } from 'styled-components';
import { bodyText, link, caption } from './utils';

/* eslint-disable indent */
export const tableBlock = css`
  .wp-block-table {
    ${bodyText};

    thead {
      border-bottom: 4px solid black;
    }

    td,
    th {
      border-right: 1px solid black;
      padding: 1px solid black;
    }

    th {
      font-weight: 700;
    }

    tr {
      border: 1px solid black;
    }

    a {
      ${link};
    }

    figcaption {
      ${caption};
    }
  }
`;
/* eslint-enable */
