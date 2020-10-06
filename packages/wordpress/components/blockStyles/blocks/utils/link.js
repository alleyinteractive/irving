import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

/* eslint-disable max-len */
const link = css`
  color: ${siteTheme('blocks.link.color', 'inherit')};
  font-weight: inherit;
  text-decoration: ${siteTheme('blocks.link.decoration', 'underline')};

  &:hover {
    color: ${siteTheme('blocks.link.hoverColor', 'inherit')};
  }
`;

export default link;
