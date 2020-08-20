import styled, { css } from 'styled-components';
import { down } from 'styled-breakpoints';
import { rgba, darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  height: 6.4rem;
  background-color: ${({ theme }) => theme.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 0 3rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;

  ${down('phone')} {
    margin: 0 auto;
  }

  ${down('xsPhone')} {
    margin: 0;
  }
`;

export const LogoLink = styled(Link)`
  width: 135px;
  margin-right: 3rem;

  &:focus {
    outline: ${({ theme }) => theme.primary} 1px solid;
  }

  img {
    width: 100%;
    vertical-align: middle;
  }

  ${down('phone')} {
    margin: 0;
    width: 212px;
  }
`;

export const LinkList = styled.ul`
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  padding-left: 3rem;
  height: 3.2rem;
  display: flex;
  align-items: center;

  ${down('phone')} {
    display: none;
  }
`;

export const LinkItem = styled.li`
  + li {
    margin-left: 2rem;
  }

  a {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.textSecondaryColor};
    transition: color 0.2s;
    position: relative;

    &.active,
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.titleColor};
    }

    &:hover,
    &:focus {
      &::after {
        transform: scaleX(1);
      }
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 1px;
      background-color: ${({ theme }) => theme.titleColor};
      left: 0;
      bottom: -3px;
      transition: transform 0.3s ease;
    }
  }
`;

export const Controls = styled.div`
  ${down('phone')} {
    display: none;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background-color: transparent;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.danger};
  position: relative;

  svg {
    font-size: 2rem;
    margin-right: 0.8rem;
  }

  &:hover,
  &:focus {
    &::after {
      transform: translateX(0) scale(1) scaleX(1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: translateX(-100%) scale(0) scaleX(0);
    height: 1px;
    background-color: ${({ theme }) => theme.danger};
    bottom: -3px;
    transition: transform 0.5s ease;
  }
`;

interface IDrawerProps {
  open?: boolean;
}

export const Drawer = styled.nav<IDrawerProps>`
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${({ theme }) => theme.secondary};
  padding: 2rem;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: 0 0 3px 3px ${({ theme }) => rgba(theme.borderColor, 0.8)};
  transform: translateX(100%) scaleX(0);
  transition: transform 0.3s;
  z-index: 1;

  ${({ open }) =>
    open &&
    css`
      transform: translateX(0) scaleX(1);
    `}
`;

export const DrawerLinkList = styled.ul`
  height: calc(100vh - 6rem - 4rem);
  margin-top: 6rem;
  margin-right: 4rem;

  display: flex;
  flex-direction: column;
`;

interface IDrawerLinkItemProps {
  isLogout?: boolean;
}

export const DrawerLinkItem = styled.li<IDrawerLinkItemProps>`
  + li {
    margin-top: 6rem;
  }

  ${({ isLogout }) =>
    isLogout &&
    css`
      margin-top: auto !important;
      margin-bottom: 3rem;

      button {
        border: 0;
        background-color: transparent;
        padding: 2rem;
        font-weight: bold;
        font-size: 2rem;
        text-transform: uppercase;
        color: ${({ theme }) => theme.danger};
        transition: color 0.2s;

        &:hover,
        &:focus {
          color ${({ theme }) => darken(0.05, theme.danger)};
        }
      }
    `}

  a {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ theme }) => theme.textSecondaryColor};
    padding: 2rem;
    transition: color 0.2s;

    &.active,
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.titleColor};
    }
  }
`;
