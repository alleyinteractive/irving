import { css } from 'styled-components';
import caption from './utils/caption';
import link from './utils/link';

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
