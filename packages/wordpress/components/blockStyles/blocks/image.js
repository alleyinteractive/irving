import { css } from 'styled-components';
import { bodyText, caption, link } from './utils';

/* eslint-disable indent, import/prefer-default-export */
export const imageBlock = css`

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
