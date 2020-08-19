import styled, { css } from 'styled-components';

import { ButtonLink } from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.main`
  padding: 3.4rem 12rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.titleColor};
`;

export const Controls = styled.div`
  margin-top: 3.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  position: relative;

  &:focus-within {
    svg {
      color: ${({ theme }) => theme.primary};
    }
  }

  svg {
    position: absolute;
    left: 1.6rem;
    top: 50%;
    transform: translateY(-50%) scale(1.4);
    font-size: 1.6rem;
    color: ${({ theme }) => theme.textSecondaryColor};
    transition: color 0.3s;
  }
`;

export const SearchInput = styled(Input)`
  height: 3.6rem;
  padding-left: 4rem;
  padding-right: 1.5rem;
  font-size: 1.4rem;

  &::placeholder {
    font-size: inherit;
  }
`;

export const RegisterLink = styled(ButtonLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3.6rem;
  padding: 0 1.6rem;

  text-transform: uppercase;
  font-size: 1.4rem;
  user-select: none;

  svg {
    color: ${({ theme }) => theme.secondary};
    transform: scale(1.9);
    margin-right: 0.8rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 0.8rem;
  border-collapse: separate;
  border-spacing: 0 2.1rem;
  text-align: left;

  thead tr th:first-child,
  tbody tr td:first-child {
    padding-left: 2.4rem;
  }

  thead tr th:last-child,
  tbody tr td:last-child {
    text-align: center;
  }

  thead {
    color: ${({ theme }) => theme.titleColor};
    font-size: 1.6rem;
  }

  tbody {
    tr {
      background-color: ${({ theme }) => theme.secondary};
      border-radius: 30px;
      font-size: 1.6rem;
      height: 5.7rem;
    }

    tr {
      td:first-child {
        border-top-left-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;
      }

      td:last-child {
        border-top-right-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;
      }
    }

    td {
      position: relative;
    }

    td button {
      background-color: transparent;
      border: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.iconColor};
      margin-top: 0.6rem;

      &:focus {
        outline: 1px solid ${({ theme }) => theme.iconColor};
        outline-offset: 4px;
      }

      svg {
        transform: scale(1.5);
      }
    }

    td span {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      text-align: initial;
    }

    .img-container {
      width: 35px;
      height: 35px;
      margin-right: 1rem;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
`;

interface IImagePlaceholder {
  colorTheme: string;
}

export const ImagePlaceholder = styled.span<IImagePlaceholder>`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center !important;
  align-items: center;

  border-radius: 50%;

  ${({ colorTheme }) => colorTheme}
`;

interface IStatus {
  status: 'delivered' | 'pending' | 'withdrawal' | 'canceled';
}

export const Status = styled.span<IStatus>`
  position: relative;
  border-radius: 1.2rem;
  padding: 0.5rem 0.7rem 0.5rem 2.2rem;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.4rem;

  &::before {
    content: '';
    width: 1rem;
    height: 1rem;
    left: 0.7rem;
    border-radius: 50%;
    position: absolute;
  }

  ${({ status }) =>
    status === 'delivered' &&
    css`
      background-color: ${({ theme }) => theme.successLight};
      color: ${({ theme }) => theme.success};

      &::before {
        background-color: ${({ theme }) => theme.success};
      }
    `}

  ${({ status }) =>
    status === 'pending' &&
    css`
      background-color: ${({ theme }) => theme.warningLight};
      color: ${({ theme }) => theme.warning};

      &::before {
        background-color: ${({ theme }) => theme.warning};
      }
    `}

  ${({ status }) =>
    status === 'withdrawal' &&
    css`
      background-color: ${({ theme }) => theme.infoLight};
      color: ${({ theme }) => theme.info};

      &::before {
        background-color: ${({ theme }) => theme.info};
      }
    `}

  ${({ status }) =>
    status === 'canceled' &&
    css`
      background-color: ${({ theme }) => theme.dangerLight};
      color: ${({ theme }) => theme.danger};

      &::before {
        background-color: ${({ theme }) => theme.danger};
      }
    `}
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  box-shadow: 0px 0px 3px 1px #00000026;
  z-index: 1;
  padding: 1.6rem 1rem;
  width: 15rem;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    height: 0;
    width: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid ${({ theme }) => theme.secondary};
    filter: drop-shadow(0px -3px 1px #00000026);
  }

  button,
  a {
    display: flex;
    margin: 0 !important;
    justify-content: flex-start !important;
    align-items: center;
    color: ${({ theme }) => theme.textSecondaryColor} !important;
    font-size: 1.6rem;
    transition: color 0.2s;

    &.view svg {
      color: ${({ theme }) => theme.primary};
    }

    &.edit svg {
      color: ${({ theme }) => theme.info};
    }

    &.delete svg {
      color: ${({ theme }) => theme.danger};
    }

    svg {
      font-size: 1.1rem;
      margin-right: 0.7rem;
      transform: scale(1.5);
    }

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.textColor} !important;
      outline: none !important;
    }

    + button,
    + a {
      padding-top: 0.7rem;
      margin-top: 0.7rem !important;
      border-top: 1px solid ${({ theme }) => theme.borderColor} !important;
    }
  }
`;
