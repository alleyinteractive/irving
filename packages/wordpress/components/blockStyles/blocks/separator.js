import { createGlobalStyle } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

export const SeparatorBlock = createGlobalStyle`
  .wp-block-separator {
    margin-left: 0;
    width: ${siteTheme('blocks.separator.width', '95%')};
  }
`;
