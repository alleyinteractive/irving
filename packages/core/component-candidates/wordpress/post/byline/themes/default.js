import styled from 'styled-components';

/* eslint-disable import/prefer-default-export */
export const BylineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AuthorsWrapper = styled.span`
  align-items: center;
  display: flex;
  margin-bottom: .5rem;
`;

export const AuthorWrapper = styled.span`
  a {
    font-weight: bold;
  }
`;

export const TimestampWrapper = styled.span`
  font-size: .9rem;
`;
/* eslint-enable */
