import { createGlobalStyle } from 'styled-components';
import { up } from 'styled-breakpoints';

import 'react-toastify/dist/ReactToastify.min.css';

export default createGlobalStyle`
  :root {
    font-size: 60%;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  html,
  body,
  #root {
    height: 100vh;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    overflow-x: hidden;
  }

  body,
  input,
  textarea,
  button,
  .Toastify__toast {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
  }

  body,
  input,
  textarea,
  button {
    color: ${({ theme }) => theme.textColor};
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .Toastify__toast--error {
    background-color: ${({ theme }) => theme.danger};
  }

  .Toastify__toast--success {
    background-color: ${({ theme }) => theme.success};
  }

  ${up('tablet')} {
    :root {
      font-size: 62.5%
    }
  }
`;
