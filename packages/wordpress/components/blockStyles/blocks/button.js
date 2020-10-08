import { createGlobalStyle } from 'styled-components';

/* eslint-disable indent */
export const ButtonBlock = createGlobalStyle`
  .wp-block-button__link {
    border: 1px solid blue;
    border-radius: 0;
    color: #000000;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 700;

    &:hover {
      background-color: blue;
      color: white;
    }
  }
`;
