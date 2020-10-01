import { createGlobalStyle } from 'styled-components';
import { link, caption } from './utils';

export const AudioBlock = createGlobalStyle`
  .wp-block-audio {

    figcaption {
      ${caption};

       a {
        ${link};
      }
    }
  }
`;
