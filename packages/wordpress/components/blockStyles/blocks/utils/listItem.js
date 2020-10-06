import { css } from 'styled-components';
import { siteTheme } from '@irvingjs/styled/utils';
import bodyText from './bodyText';

const listItem = css`
  ${bodyText};
  margin: ${siteTheme('blocks.list.itemMargin', '0 0 0.5rem 0')};
`;

export default listItem;
