import styled, { css } from 'styled-components';

import { IPackage } from '../..';

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

export const InfoBox = styled.div`
  h5 {
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }

  img {
    max-width: 100%;
    margin-top: 0.8rem;
  }

  p {
    line-height: 26px;
    font-size: 1.6rem;

    span.pending {
      font-style: italic;
      color: ${({ theme }) => theme.textSecondaryColor};
    }
  }

  + div {
    border-top: 1px solid ${({ theme }) => theme.borderColor};
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

export const ModalLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    color: ${({ theme }) => theme.primary};
    margin-top: 1rem;
  }
`;

export const NotFound = styled.span`
  font-style: italic;
  color: ${({ theme }) => theme.textSecondaryColor};
`;
