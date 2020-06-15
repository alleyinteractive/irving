/* eslint max-len: 0 */
import styled from 'styled-components';

// eslint-disable import/prefer-default-export.
export const SearchFormWrapper = styled.form`
  display: flex;
  width: 100%;
`;

export const SearchFormTerm = styled.input`
  border-radius: 0;
  border: 1px solid black;
  border-right: none;
  flex-grow: 1;
  font-size: 1rem;
  padding: 1rem;
`;

export const SearchFormSubmitButton = styled.button`
  border: 1px solid black;
  border-radius: 0;
`;
// eslint-enable.
