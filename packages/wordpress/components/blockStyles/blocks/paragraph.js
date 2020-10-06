import { createGlobalStyle } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';
import { bodyText, link } from './utils';

export const ParagraphBlock = createGlobalStyle`
  [data-type="core/paragraph"],
  .defector__article-content p {
    ${bodyText};

    a {
      ${link};
    }

    &.has-drop-cap:first-letter {
      font-size: ${siteTheme('blocks.paragraph.dropCapSize', '5rem')};
      font-weight: ${siteTheme('blocks.paragraph.dropCapWeight', '700')};
    }
  }
`;
