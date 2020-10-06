import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

const list = css`
  list-style: ${siteTheme('blocks.list.style', 'disc')};
  margin-left: ${siteTheme('blocks.list.margin', '1.25rem')};
`;

export default list;
