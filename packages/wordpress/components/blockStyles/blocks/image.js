import { createGlobalStyle } from 'styled-components';
import { bodyText, caption, link } from './utils';

export const ImageBlock = createGlobalStyle`
  .wp-block-image {
    ${bodyText};

    figcaption {
      ${caption};

      a {
        ${link};
      }
    }

    img {
      height: auto;
    }
  }
`;
