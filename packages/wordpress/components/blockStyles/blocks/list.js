import { css } from 'styled-components';
import { link, list, listItem } from './utils';

export const listBlock = css`

  [data-type="core/list"],
  .irving__post-content ul,
  .irving__post-content ol {
    ${list}

    li {
      ${listItem}
    }

    a {
      ${link};
    }
  }

  ol[data-type="core/list"],
  .irving__post-content ol {
    list-style: decimal;
  }
`;
