import { css } from 'styled-components';
import caption from './utils/caption';
import link from './utils/link';

/* eslint-disable indent, import/prefer-default-export */
export const videoBlock = css`

  .wp-block-video {

    figcaption {
      ${caption};

      a {
        ${link};
      }
    }
  }
`;
