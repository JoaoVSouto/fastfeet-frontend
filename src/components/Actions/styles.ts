import styled, { css } from 'styled-components';

export const Button = styled.button`
  background-color: transparent;
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.iconColor};
  margin-top: 0.6rem;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.iconColor};
    outline-offset: 4px;
  }

  svg {
    transform: scale(1.5);
  }
`;

interface IDropdown {
  open?: boolean;
  intersected?: boolean;
  isMobile?: boolean;
  width?: string;
  mobileLeft?: string;
}

export const Dropdown = styled.div<IDropdown>`
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  box-shadow: 0px 0px 3px 1px #00000026;
  z-index: 1;
  padding: 1.6rem 1rem;
  width: ${({ width }) => width || '15rem'};
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.3s;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      pointer-events: unset;
      visibility: unset;
    `}

  ${({ intersected }) =>
    intersected &&
    css`
      top: unset;
      bottom: 5rem;

      &::before {
        top: unset !important;
        bottom: -10px;
        border-bottom: 0 !important;
        border-top: 12px solid ${({ theme }) => theme.secondary};
        filter: drop-shadow(0px 3px 1px #00000026) !important;
      }
    `}

    ${({ isMobile, mobileLeft }) =>
      isMobile &&
      css`
        left: ${mobileLeft || '-3rem'};

        &::before {
          left: 82% !important;
        }
      `}

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    height: 0;
    width: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid ${({ theme }) => theme.secondary};
    filter: drop-shadow(0px -3px 1px #00000026);
  }

  button,
  a {
    background-color: transparent;
    border: 0;
    display: flex;
    margin: 0 !important;
    justify-content: flex-start !important;
    align-items: center;
    color: ${({ theme }) => theme.textSecondaryColor} !important;
    font-size: 1.6rem;
    transition: color 0.2s;

    &.view svg {
      color: ${({ theme }) => theme.primary};
    }

    &.edit svg {
      color: ${({ theme }) => theme.info};
    }

    &.delete svg {
      color: ${({ theme }) => theme.danger};
    }

    svg {
      font-size: 1.1rem;
      margin-right: 0.7rem;
      transform: scale(1.5);
    }

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.textColor} !important;
      outline: none !important;
    }

    + button,
    + a {
      padding-top: 0.7rem;
      margin-top: 0.7rem !important;
      border-top: 1px solid ${({ theme }) => theme.borderColor} !important;
    }
  }
`;

export const ActionsContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: ${({ theme }) => theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.09);

  button {
    margin: 0;
    height: 100%;
    width: 100%;
  }
`;
