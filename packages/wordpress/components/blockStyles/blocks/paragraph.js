import { css } from 'styled-components';
import { bodyText, link } from './utils';

/* stylelint-disable selector-max-specificity */
/* eslint-disable indent, import/prefer-default-export */
export const paragraphBlock = css`

  [data-type="core/paragraph"],
  .irving__post-content p {
    ${bodyText};

    a {
      ${link};
    }

    &.has-drop-cap::first-letter {
      font-size: 5rem;
      font-weight: 700;
    }
  }
`;
/* stylelint-enable */
