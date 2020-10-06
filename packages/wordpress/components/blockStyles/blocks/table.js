import { createGlobalStyle } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';
import { bodyText, link, caption } from './utils';

/* eslint-disable indent */
export const TableBlock = createGlobalStyle`
  .wp-block-table {
    ${bodyText};

    thead {
      border-bottom: ${siteTheme(
        'blocks.table.headBorderBottom',
        '4px solid black'
      )};
    }

    td,
    th {
      border-right: ${siteTheme(
        'blocks.table.border',
        '1px solid black'
      )};
      padding: ${siteTheme(
        'blocks.table.cellPadding',
        '0.25rem 0 0.25rem'
      )};
    }

    th {
      font-weight: ${siteTheme(
        'blocks.table.thFontWeight',
        '700'
      )};
    }

    tr {
      border: ${siteTheme(
        'blocks.table.border',
        '1px solid black'
      )};
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
