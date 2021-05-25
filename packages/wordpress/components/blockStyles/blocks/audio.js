import { css } from 'styled-components';
import { link, caption } from './utils';

// eslint-disable-next-line import/prefer-default-export
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
