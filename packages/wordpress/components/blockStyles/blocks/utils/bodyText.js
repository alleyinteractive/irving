import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

const bodyText = css`
  color: ${siteTheme('blocks.bodyText.color', '#000000')};
  font-family: ${siteTheme(
    'blocks.bodyText.fontFamily',
    'Arial, Helvetica, sans-serif'
  )};
  font-size: ${siteTheme('blocks.bodyText.fontSize', '1rem')};
  font-style: ${siteTheme('blocks.bodyText.fontStyle', 'normal')};
  font-weight: ${siteTheme('blocks.bodyText.fontWeight', 400)};
  letter-spacing: ${siteTheme('blocks.bodyText.letterSpacing', 'normal')};
  line-height: ${siteTheme('blocks.bodyText.lineHeight', 1)};

  strong,
  b {
    font-size: ${siteTheme('blocks.bodyText.strong.fontWeight', '700')};
  }

  em,
  i {
    font-size: ${siteTheme('blocks.bodyText.em.fontStyle', 'italic')};
  }
`;

export default bodyText;
