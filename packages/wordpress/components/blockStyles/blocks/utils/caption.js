import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

const caption = css`
  color: ${siteTheme('blocks.caption.color', '#333333')};
  font-family: ${siteTheme(
    'blocks.caption.fontFamily',
    'Arial, Helvetica, sans-serif'
  )};
  font-size: ${siteTheme('blocks.caption.fontSize', '0.75rem')};
`;

export default caption;
