import styled from 'styled-components';
import { darken } from 'polished';

import { Button } from '../Button';

export const ModalDeletionContainer = styled.div`
  div {
    display: flex;
    justify-content: flex-end;
    margin-top: 2.4rem;
  }
`;

export const AcceptButton = styled(Button)`
  height: 3.6rem;
  padding: 1.6rem;
  margin-left: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CancelButton = styled(Button)`
  height: 3.6rem;
  padding: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  transition: all 0.3s;

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.secondary};
    background-color: ${({ theme }) => theme.primary};
  }

  &:active {
    border-color: ${({ theme }) => darken(0.1, theme.primary)};
    background-color: ${({ theme }) => darken(0.1, theme.primary)};
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
