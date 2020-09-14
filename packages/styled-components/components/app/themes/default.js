import styled from 'styled-components';
import { screenreaderOnly } from '@irvingjs/styled/utils';

/* eslint-disable import/prefer-default-export */
export const SkipLink = styled.a`
  ${screenreaderOnly}

  &:focus,
  &:active {
    align-items: center;
    background-color: #FFF;
    border: 2px solid #000;
    clip: auto;
    clip-path: none;
    color: #000;
    display: flex;
    font-size: 18px;
    height: 40px;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 200px;
    z-index: 1000;
  }
`;
/* eslint-enable */
