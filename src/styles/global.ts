import { createGlobalStyle } from 'styled-components';

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
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
  }

  body,
  input,
  textarea,
  button,
  .Toastify__toast {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
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

  @media (min-width: 768px) {
    :root {
      font-size: 62.5%
    }
  }
`;
