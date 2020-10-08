import { css } from 'styled-components';
import { bodyText, link } from './utils';

export const paragraphBlock = css`
  [data-type="core/paragraph"],
  .irving__post-content p {
    ${bodyText};

    a {
      ${link};
    }

    &.has-drop-cap:first-letter {
      font-size: 5rem;
      font-weight: 700;
    }
  }
`;
