import { css, createGlobalStyle } from 'styled-components';
import { link } from './utils';

const heading = css`
  color: #000000;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;

  a {
    ${link};
  }
`;

export const HeadingBlock = createGlobalStyle`
  [data-type="core/heading"] {
    ${heading}
  }

  .article_content {

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
  .defector__article-content h1 {
    font-size: 2.25rem;
    line-height: 1.3;
  }

  h2[data-type="core/heading"],
  .defector__article-content h2 {
    font-size: 2rem;
    line-height: 1.3;
  }

  h3[data-type="core/heading"],
  .defector__article-content h3 {
    font-size: 1.75rem;
    line-height: 1.4;
  }

  h4[data-type="core/heading"],
  .defector__article-content h4 {
    font-size: 1.5rem;
    line-height: 1.4;
  }

  h5[data-type="core/heading"],
  .defector__article-content h5 {
    font-size: 1.25rem;
    line-height: 1.55;
  }

  h6[data-type="core/heading"],
  .defector__article-content h6 {
    font-size: 1rem;
    line-height: 1.55;
  }
`;
