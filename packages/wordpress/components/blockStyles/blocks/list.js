import { createGlobalStyle } from 'styled-components';
import { link, list, listItem } from './utils';

export const ListBlock = createGlobalStyle`
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
