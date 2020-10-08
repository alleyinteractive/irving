import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';

const list = css`
  list-style: ${siteTheme('blocks.list.listStyle', 'disc')};
  margin: ${siteTheme('blocks.list.margin', '0 0 0 1.25rem')};
`;

export default list;
