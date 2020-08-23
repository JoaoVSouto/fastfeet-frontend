import styled from 'styled-components';
import { down } from 'styled-breakpoints';

import { ButtonLink } from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.main`
  padding: 3.4rem 12rem;

  ${down('phone')} {
    padding: 2.4rem 3rem;
  }
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

  ${down('smPhone')} {
    margin-top: 1.5rem;
    flex-direction: column-reverse;
    align-items: initial;
  }
`;

export const SearchContainer = styled.div`
  position: relative;

  &:focus-within {
    svg {
      color: ${({ theme }) => theme.primary};
    }
  }

  svg {
    position: absolute;
    left: 1.6rem;
    top: 50%;
    transform: translateY(-50%) scale(1.4);
    font-size: 1.6rem;
    color: ${({ theme }) => theme.textSecondaryColor};
    transition: color 0.3s;
  }
`;

export const SearchInput = styled(Input)`
  height: 3.6rem;
  padding-left: 4rem;
  padding-right: 1.5rem;
  font-size: 1.4rem;

  ${down('smPhone')} {
    width: 100%;
  }

  &::placeholder {
    font-size: inherit;
  }
`;

export const RegisterLink = styled(ButtonLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3.6rem;
  padding: 0 1.6rem;

  text-transform: uppercase;
  font-size: 1.4rem;
  user-select: none;

  ${down('smPhone')} {
    margin-bottom: 1.5rem;
  }

  svg {
    color: ${({ theme }) => theme.secondary};
    transform: scale(1.9);
    margin-right: 0.8rem;
  }
`;

export const NotFound = styled.h4`
  margin-top: 2.4rem;
  text-align: center;
  font-weight: normal;
`;
