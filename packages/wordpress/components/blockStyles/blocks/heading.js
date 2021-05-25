import { css } from 'styled-components';
import { link } from './utils';

/* eslint-disable indent, import/prefer-default-export */
const heading = css`
  color: #000000;
  font-family: "Arial", "Helvetica", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;

  a {
    ${link};
  }
`;

export const headingBlock = css`

  [data-type="core/heading"] {
    ${heading}
  }

  .irving__post-content {

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      ${heading}
    }
  }

  h1[data-type="core/heading"],
  .irving__post-content h1 {
    font-size: 2.25rem;
  }

  h2[data-type="core/heading"],
  .irving__post-content h2 {
    font-size: 2rem;
  }

  h3[data-type="core/heading"],
  .irving__post-content h3 {
    font-size: 1.75rem;
  }

  h4[data-type="core/heading"],
  .irving__post-content h4 {
    font-size: 1.5rem;
  }

  h5[data-type="core/heading"],
  .irving__post-content h5 {
    font-size: 1.25rem;
  }

  h6[data-type="core/heading"],
  .irving__post-content h6 {
    font-size: 1rem;
  }
`;
