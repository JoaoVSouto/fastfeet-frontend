import styled from 'styled-components';

import { Button } from '../../components/Button';
import StyledInput from '../../components/Input';

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.secondary};
  padding: 6rem 3rem;
  border-radius: 0.4rem;
  text-align: center;
  max-width: 360px;
  margin: 0 2rem;
`;

interface ILoadingWrapperProps {
  isLoading?: boolean;
}

export const LoadingWrapper = styled.div<ILoadingWrapperProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.4rem;
  backdrop-filter: blur(0.3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: ${({ isLoading }) => (isLoading ? 'unset' : 'none')};
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  transition: opacity 0.2s;

  strong {
    margin-top: 1rem;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.primary};
  }
`;

export const Logo = styled.img`
  width: 85%;
`;

export const Form = styled.form`
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
`;

export const InputBlock = styled.div`
  &:focus-within {
    label {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.titleColor};
  transition: color 0.3s;
`;

export const Input = styled(StyledInput)`
  margin-bottom: 1.5rem;
  padding: 1.2rem 1.5rem;
  width: 100%;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;

  &:focus {
    + label {
      color: ${({ theme }) => theme.primary};

      &::before {
        border-color: ${({ theme }) => theme.primary};
      }
    }
  }

  &:checked + label::before {
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const CheckboxLabel = styled.label`
  text-align: left;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  user-select: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  transition: color 0.3s;

  svg {
    position: absolute;
    color: ${({ theme }) => theme.secondary};
    height: 2.8rem;
    width: 2.8rem;
    transform: translateX(-2px);
  }

  &::before {
    content: '';
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 0.4rem;
    margin-right: 1.6rem;
    transition: all 0.3s;
  }
`;

export const Error = styled.span`
  display: block;
  margin-top: -1rem;
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.danger};
  font-size: 1.4rem;
  font-weight: bold;
  text-align: right;
`;

export const SubmitButton = styled(Button)`
  height: 4.5rem;
  font-size: 1.6rem;
`;
