/* eslint max-len: 0 */
import styled from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const TextWrapper = styled.div`
  height: 0;
  max-width: 100%;
  overflow: hidden;
  position: relative;

  iframe,
  object,
  embed {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;
/* eslint-enable */
