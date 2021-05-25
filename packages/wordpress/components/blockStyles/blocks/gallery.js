import { css } from 'styled-components';
import { caption, link } from './utils';

/* stylelint-disable selector-max-specificity */
/* eslint-disable indent, import/prefer-default-export */
export const galleryBlock = css`

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
/* stylelint-enable */
