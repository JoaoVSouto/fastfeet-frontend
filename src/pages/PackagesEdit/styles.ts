import styled from 'styled-components';

import { Button } from '../../components/Button';
import StyledInput from '../../components/Input';

export const Container = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding-top: 3.4rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.titleColor};
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

// Tag fieldset didn't work properly with display grid
export const Fieldset = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 1.6rem;
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
