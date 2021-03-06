import styled from 'styled-components';
import { screenreaderOnly } from '@irvingjs/styled/utils';

/* eslint-disable import/prefer-default-export */
export const LogoWrapper = styled.span`
  display: block;

  /* @todo can we use relative units for this? */
  img {
    max-width: 250px;
    padding: 10px;
  }
`;

export const LogoLink = styled.a``;

export const LogoImage = styled.span``;

export const SiteName = styled.span`
  font-size: 2rem;
  ${(props) => (props.screenreaderOnly ? screenreaderOnly : '')};
`;
/* eslint-enable */
