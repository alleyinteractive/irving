import styled from 'styled-components';
import { screenreaderOnly } from '@irvingjs/styled/utils';

/* eslint-disable import/prefer-default-export */
export const SkipLink = styled.a`
  ${screenreaderOnly}

  &:focus {
    display: block;
    left: 6px;
    top: 7px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    line-height: normal;
    padding: 15px 23px 14px;
    z-index: 100000;
    right: auto;
  }
`;
/* eslint-enable */
