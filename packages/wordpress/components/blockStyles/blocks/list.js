import { createGlobalStyle } from 'styled-components';
import { link, list, listItem } from './utils';

export const ListBlock = createGlobalStyle`
  [data-type="core/list"],
  .article_content ul,
  .article_content ol {
    ${list}

    li {
      ${listItem}
    }

    a {
      ${link};
    }
  }

  ol[data-type="core/list"],
  .article_content ol {
    list-style: decimal;
  }
`;
