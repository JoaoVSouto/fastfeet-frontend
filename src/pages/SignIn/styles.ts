import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.secondary};
  padding: 6rem 3rem;
  border-radius: 0.4rem;
  text-align: center;
  max-width: 360px;
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
  width: 253px;
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

export const Input = styled.input`
  margin-bottom: 1.5rem;
  padding: 1.2rem 1.5rem;
  border-radius: 0.4rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textColor};
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondaryColor};
    font-size: 1.6rem;
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

export const SubmitButton = styled.button`
  height: 4.5rem;
  border-radius: 0.4rem;
  border: 0;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  font-size: 1.6rem;
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => darken(0.05, theme.primary)};
  }

  &:active {
    background-color: ${({ theme }) => darken(0.1, theme.primary)};
  }
`;
