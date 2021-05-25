import { css } from 'styled-components';
import { link, list, listItem } from './utils';

/* stylelint-disable selector-max-specificity */
/* eslint-disable indent, import/prefer-default-export */
export const latestPostsBlock = css`

  [data-type="core/latest-posts"] ul,
  .wp-block-latest-posts,
  .wp-block-latest-posts.wp-block-latest-posts__list {
    ${list}
    padding-left: 0;

    li {
      ${listItem}

      .wp-block-latest-posts__post-author,
      .wp-block-latest-posts__post-date {
        color: inherit;
        font-size: inherit;
      }
    }

    a {
      ${link};
    }
  }
`;
/* stylelint-enable */
