import { css } from 'styled-components';
import rem from './rem';

const inputReset = css`
  appearance: none;
  border-radius: 0;
  border: 0;
  margin: 0;
  padding: ${rem(5, 10)};
`;

export default inputReset;
