import styled, { css } from 'styled-components';
import { down } from 'styled-breakpoints';

export interface IHamburguerProps {
  open?: boolean;
}

export const Hamburguer = styled.button<IHamburguerProps>`
  z-index: 2;
  position: absolute;
  right: 1.5rem;
  transform: rotate(0deg) scale(0.5);
  transition: 0.5 ease-in-out;
  width: 6rem;
  height: 4.5rem;
  border: 0;
  background-color: transparent;
  display: none;

  ${down('phone')} {
    display: block;
  }

  span {
    display: block;
    position: absolute;
    height: 0.9rem;
    width: 100%;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 0.9rem;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 18px;
    }

    &:nth-child(4) {
      top: 36px;
    }
  }

  ${({ open }) =>
    open &&
    css`
      span {
        &:nth-child(1),
        &:nth-child(4) {
          top: 18px;
          width: 0;
          left: 50%;
        }

        &:nth-child(2) {
          transform: rotate(45deg);
        }

        &:nth-child(3) {
          transform: rotate(-45deg);
        }
      }
    `}
`;
