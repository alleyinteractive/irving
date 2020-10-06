import { createGlobalStyle } from 'styled-components';
import { caption, link } from './utils';

export const GalleryBlock = createGlobalStyle`
  .wp-block-gallery ul,
  .irving__post-content .wp-block-gallery ul {
    list-style-type: none;
    margin-left: 0;

    figcaption {
      ${caption};

       a {
        ${link};
      }
    }
  }
`;
