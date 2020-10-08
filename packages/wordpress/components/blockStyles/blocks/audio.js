import { css } from 'styled-components';
import { link, caption } from './utils';

export const audioBlock = css`
  .wp-block-audio {

    figcaption {
      ${caption};

       a {
        ${link};
      }
    }
  }
`;
