import styled from 'styled-components';
import { down } from 'styled-breakpoints';

import { Button } from '../Button';
import StyledInput from '../Input';

export const Container = styled.main`
  max-width: 114rem;
  margin: 0 auto;
  padding: 3.4rem 12rem;

  ${down('phone')} {
    padding: 2.4rem 3rem;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${down('smPhone')} {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.titleColor};
`;

export const Actions = styled.div`
  ${down('smPhone')} {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    width: 100%;

    button {
      margin: 0;
      width: 48%;
    }
  }
`;

const BaseButton = styled(Button)`
  height: 3.6rem;
  padding: 0 1.6rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  font-size: 1.4rem;

  svg {
    color: inherit;
    margin-right: 0.8rem;
  }
`;

export const BackButton = styled(BaseButton)`
  margin-right: 1.6rem;
  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};
  transition: all 0.2s;

  svg {
    transform: scale(1.8);
  }

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

export const SaveButton = styled(BaseButton)`
  svg {
    transform: scale(1.7);
  }
`;

export const Form = styled.form`
  margin-top: 2rem;
  padding: 3rem;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 0.4rem;
`;

export const Label = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.titleColor};
  font-weight: bold;
  margin-bottom: 0.9rem;
`;

export const Input = styled(StyledInput)`
  height: 4.5rem;
  padding: 0 1.5rem;
`;

export const Error = styled.span`
  display: block;
  color: ${({ theme }) => theme.danger};
  font-size: 1.4rem;
  margin-top: 0.8rem;
  font-weight: bold;
  text-align: right;
`;
