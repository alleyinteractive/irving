import { css } from 'styled-components';
import { bodyText, caption, link } from './utils';

export const embedBlock = css`
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
