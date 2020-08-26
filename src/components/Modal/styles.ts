import styled from 'styled-components';

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

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.secondary};
  }
`;
