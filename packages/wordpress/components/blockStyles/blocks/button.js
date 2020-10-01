import { createGlobalStyle } from 'styled-components';

export const ButtonBlock = createGlobalStyle`
  .wp-block-button__link {
    border: 2px solid blue;
    border-radius: 0;
    color: blue;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.85rem;
    font-weight: 700;

    &:hover {
      background-color: blue;
      color: white;
    }
  }
`;
