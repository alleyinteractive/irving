import styled from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const LinkWrapper = styled.a`
  color: black;
  font-family: inherit;
  text-decoration: none;

  > * {
    pointer-events: none;
  }

  svg {
    pointer-events: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;
/* eslint-enable */
