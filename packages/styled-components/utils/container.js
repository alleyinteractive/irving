import { css } from 'styled-components';
import rem from './rem';

const container = (width, gutter = 20) => css`
  margin-left: auto;
  margin-right: auto;
  max-width: ${width};
  padding: ${rem(0, gutter)};
  width: 100%;
`;

export default container;
