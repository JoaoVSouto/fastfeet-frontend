import { createGlobalStyle } from 'styled-components';

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
  button {
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

  @media (min-width: 768px) {
    :root {
      font-size: 62.5%
    }
  }
`;
