import styled from 'styled-components';

export const BylineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre; // Ensure that whitespace in our delimiters is respected.
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
