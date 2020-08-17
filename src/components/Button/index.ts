import styled, { css } from 'styled-components';
import { darken } from 'polished';

const styles = css`
  border-radius: 0.4rem;
  border: 0;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  letter-spacing: 0.03rem;
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => darken(0.05, theme.primary)};
  }

  &:active {
    background-color: ${({ theme }) => darken(0.1, theme.primary)};
  }
`;

export const Button = styled.button`
  ${styles}
`;

export const ButtonLink = styled.a`
  ${styles}
`;
