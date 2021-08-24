import { createGlobalStyle } from 'styled-components';

// Creating a GlobalStyle can allow me to use Theme color variables to affect the root of the document
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.border.primary};
  }
`;
