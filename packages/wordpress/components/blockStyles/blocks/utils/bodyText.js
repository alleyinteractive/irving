import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

const bodyText = css`
  color: ${siteTheme('blocks.bodyText.color', '#000000')};
  font-family: ${siteTheme(
    'blocks.bodyText.fontFamily',
    'Arial, Helvetica, sans-serif'
  )};
  font-size: ${siteTheme('blocks.bodyText.fontSize', '1rem')};

  strong,
  b {
    font-weight: 700;
  }

  em,
  i {
    font-style: italic;
  }
`;

export default bodyText;
