import { createGlobalStyle } from 'styled-components';
import caption from './utils/caption';
import link from './utils/link';

export const VideoBlock = createGlobalStyle`
  .wp-block-video {

    figcaption {
      ${caption};
 
      a {
        ${link};
      }
    }
  }
`;
