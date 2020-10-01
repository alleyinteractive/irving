import { createGlobalStyle } from 'styled-components';
import { link, list, listItem } from './utils';

export const ListBlock = createGlobalStyle`
  [data-type="core/list"],
  .defector__article-content ul,
  .defector__article-content ol {
    ${list}

    li {
      ${listItem}
    }

    a {
      ${link};
    }
  }

  ol[data-type="core/list"],
  .defector__article-content ol {
    list-style-type: decimal;
  }
`;
