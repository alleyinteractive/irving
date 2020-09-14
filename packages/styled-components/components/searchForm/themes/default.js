/* eslint max-len: 0 */
import styled from 'styled-components';
import { screenreaderOnly } from '@irvingjs/styled/utils';

// eslint-disable import/prefer-default-export.
export const SearchFormWrapper = styled.form`
  display: flex;
  width: 100%;
`;

export const SearchLabel = styled.label`
  ${screenreaderOnly}
`;

export const SearchFormTerm = styled.input`
  border-radius: 0;
  border-right: none;
  border: 1px solid black;
  flex-grow: 1;
  font-size: 1rem;
  padding: 1rem;
`;

export const SearchFormSubmitButton = styled.button`
  border-radius: 0;
  border: 1px solid black;
`;
// eslint-enable.
