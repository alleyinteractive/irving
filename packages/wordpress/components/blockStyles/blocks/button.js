import { createGlobalStyle } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

/* eslint-disable indent */
export const ButtonBlock = createGlobalStyle`
  .wp-block-button__link {
    border: ${siteTheme('blocks.button.border', '12x solid blue')};
    border-radius: ${siteTheme('blocks.button.borderRadisu', 0)};
    color: ${siteTheme('blocks.button.color', 'blue')};
    font-family: ${siteTheme(
      'blocks.button.fontFamily',
      'Arial, Helvetica, sans-serif'
    )};
    font-size: ${siteTheme('blocks.button.fontSize', '1rem')};
    font-weight: ${siteTheme('blocks.button.fontWeight', '700')};

    &:hover {
      background-color: ${siteTheme(
        'blocks.button.hoverBackground',
        'blue'
      )};
      color: ${siteTheme('blocks.button.hoverColor', 'white')};
    }
  }
`;
