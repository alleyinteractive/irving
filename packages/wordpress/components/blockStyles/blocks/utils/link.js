import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

/* eslint-disable max-len, indent */
const link = css`
  border: ${siteTheme('blocks.link.border', 'inherit')};
  color: ${siteTheme('blocks.link.color', 'inherit')};
  font-family: ${siteTheme(
    'blocks.link.fontFamily',
    'Arial, Helvetica, sans-serif'
  )};
  font-style: ${siteTheme('blocks.link.fontStyle', 'normal')};
  font-weight: ${siteTheme('blocks.link.fontWeight', 400)};
  text-decoration: ${siteTheme('blocks.link.textDecoration', 'underline')};

  &:hover {
    color: ${siteTheme('blocks.link.hover.color', 'inherit')};
    text-decoration: ${siteTheme(
      'blocks.link.hover.textDecoration',
      'underline'
    )};
  }
`;

export default link;
