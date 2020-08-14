import styled from 'styled-components';

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
`;

export const LogoLink = styled.a`
  width: 135px;
  margin-right: 3rem;

  &:focus {
    outline: ${({ theme }) => theme.primary} 1px solid;
  }

  img {
    width: 100%;
    vertical-align: middle;
  }
`;

export const LinkList = styled.ul`
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  padding-left: 3rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
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

export const Controls = styled.div``;

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
