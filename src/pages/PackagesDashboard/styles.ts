import styled from 'styled-components';

import { ButtonLink } from '../../components/Button';

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

export const SearchInput = styled.input``;

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
