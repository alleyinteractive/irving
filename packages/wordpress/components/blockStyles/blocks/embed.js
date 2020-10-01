import { createGlobalStyle } from 'styled-components';
import { bodyText, caption, link } from './utils';

export const EmbedBlock = createGlobalStyle`
  [data-type^="core-embed"],
  .wp-block-embed {

    figcaption {
      ${caption};
    }

    a {
      ${link};
    }

    blockquote {
      ${bodyText};
    }
  }
`;
