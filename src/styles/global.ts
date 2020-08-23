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

  .ReactModal {
    &__Body--open {
      overflow: hidden;
    }

    &__Overlay {
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.7) !important;
      z-index: 3;
      transition: opacity 300ms ease-in-out;

      &--after-open {
        opacity: 1;
      }

      &--before-close {
        opacity: 0;
      }
    }

    &__Content {
      width: fit-content;
      height: fit-content;
      padding: 2.5rem !important;
      border: 0 !important;
      box-shadow: 0px 0px 10px #00000033;

      right: 0 !important;
      bottom: 0 !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%);
    }
  }


  ${up('tablet')} {
    :root {
      font-size: 62.5%
    }
  }
`;
