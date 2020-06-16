/* eslint max-len: 0 */
import styled from 'styled-components';

// eslint-disable import/prefer-default-export.
export const NoResults = styled.span``;

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const NavWrapper = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
`;

export const CurrentPageNavWrapper = styled(NavWrapper)`
  background: #CCC;
`;

export const NextAndPrevNavWrapper = styled(NavWrapper)`
  background: #DDD;
`;
export const EllipsesNavWrapper = styled(NavWrapper)`
  border: none;
`;
// eslint-enable.
