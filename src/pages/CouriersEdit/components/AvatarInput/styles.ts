import styled from 'styled-components';

import { Theme } from '../../../../utils/getRandomTheme';

export const Container = styled.div`
  height: 15rem;
  width: 15rem;
  border-radius: 50%;
  border: 1px dashed ${({ theme }) => theme.borderColor};
  margin: 0 auto 2.3rem;
  display: flex;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};

    label {
      color: ${({ theme }) => theme.primary};
    }
  }

  label {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.borderColor};
    cursor: pointer;
    position: relative;
    transition: color 0.2s;

    img {
      position: absolute;
      border-radius: 50%;
      width: 103%;
      height: 103%;
      object-fit: cover;
      background-color: ${({ theme }) => theme.secondary};
    }

    svg {
      font-size: 5.3rem;
    }

    strong {
      font-size: 1.6rem;
      line-height: 21px;
    }
  }

  input {
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }
`;

interface IInitialDisplay {
  colorTheme: Theme;
}

export const InitialsDisplay = styled.span<IInitialDisplay>`
  position: absolute;
  background-color: ${({ colorTheme }) => colorTheme.backgroundColor};
  color: ${({ colorTheme }) => colorTheme.color};
  border: 1px dashed ${({ colorTheme }) => colorTheme.color};
  font-size: 6.6rem;
  height: 100%;
  width: 100%;
  transform: scale(1.02);
  border-radius: 50%;
  display: grid;
  place-items: center;
`;
