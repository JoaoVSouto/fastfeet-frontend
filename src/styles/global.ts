import { createGlobalStyle } from 'styled-components';
import { up } from 'styled-breakpoints';
import { rgba } from 'polished';

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
      max-width: 90%;
      height: fit-content;
      max-height: 90%;
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

  .ReactSelect {
    &__control {
      border-color: ${({ theme }) => theme.borderColor} !important;
      height: 4.5rem;

      &--is-focused {
        border-color: ${({ theme }) => theme.primary} !important;
        box-shadow: none !important;

        .ReactSelect__dropdown-indicator {
          color: ${({ theme }) => theme.primary} !important;
        }
      }
    }

    &__indicator-separator {
      display: none;
    }

    &__dropdown-indicator {
      color: ${({ theme }) => theme.iconColor} !important;
      padding-right: 0.9rem !important;
    }

    &__single-value {
      color: ${({ theme }) => theme.textColor} !important;
    }

    &__placeholder {
      color: ${({ theme }) => theme.textSecondaryColor} !important;
    }

    &__value-container {
      padding: 0 1.3rem !important;
    }

    &__option {
      &--is-focused {
        background-color: ${({ theme }) => rgba(theme.primary, 0.2)} !important;
      }

      &:active {
        background-color: ${({ theme }) => rgba(theme.primary, 0.3)} !important;
      }

      &--is-selected {
        background-color: ${({ theme }) => rgba(theme.primary, 0.8)} !important;

        &:active {
          background-color: ${({ theme }) =>
            rgba(theme.primary, 0.8)} !important;
        }
      }
    }
  }

  ${up('tablet')} {
    :root {
      font-size: 62.5%
    }
  }
`;
