import styled, { css } from 'styled-components';

import { IPackage } from '../..';

export const ImageContainer = styled.span`
  display: inline-flex;
  width: 35px;
  height: 35px;
  margin-right: 1rem;

  img {
    width: 100%;
    border-radius: 50%;
  }

  span {
    width: inherit;
    height: inherit;
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
  status: IPackage['status'];
}

export const Status = styled.span<IStatus>`
  display: inline-flex !important;
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
    top: 50%;
    transform: translateY(-50%);
  }

  ${({ status }) =>
    status === 'entregue' &&
    css`
      background-color: ${({ theme }) => theme.successLight};
      color: ${({ theme }) => theme.success};

      &::before {
        background-color: ${({ theme }) => theme.success};
      }
    `}

  ${({ status }) =>
    status === 'pendente' &&
    css`
      background-color: ${({ theme }) => theme.warningLight};
      color: ${({ theme }) => theme.warning};

      &::before {
        background-color: ${({ theme }) => theme.warning};
      }
    `}

  ${({ status }) =>
    status === 'retirada' &&
    css`
      background-color: ${({ theme }) => theme.infoLight};
      color: ${({ theme }) => theme.info};

      &::before {
        background-color: ${({ theme }) => theme.info};
      }
    `}

  ${({ status }) =>
    status === 'cancelada' &&
    css`
      background-color: ${({ theme }) => theme.dangerLight};
      color: ${({ theme }) => theme.danger};

      &::before {
        background-color: ${({ theme }) => theme.danger};
      }
    `}
`;

export const ActionsContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.09);

  button {
    margin: 0;
    height: 100%;
    width: 100%;
  }
`;