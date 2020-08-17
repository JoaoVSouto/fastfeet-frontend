import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';

import { signOut } from '../../store/modules/auth/actions';

import { useWindowSize } from '../../hooks/useWindowSize';

import Hamburguer from './components/Hamburguer';

import {
  Container,
  Navigation,
  Controls,
  LogoLink,
  LinkItem,
  LinkList,
  LogoutButton,
  Drawer,
  DrawerLinkList,
  DrawerLinkItem,
} from './styles';

import logo from '../../assets/images/logo.png';

const links = [
  {
    label: 'Encomendas',
    to: '/packages',
  },
  {
    label: 'Entregadores',
    to: '/couriers',
  },
  {
    label: 'Destinatários',
    to: '/recipients',
  },
  {
    label: 'Problemas',
    to: '/problems',
  },
];

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { width } = useWindowSize();

  const drawerRef = useRef<HTMLElement>(null);
  const hamburguerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      if (
        !drawerRef.current?.contains(e.target as Node) &&
        !hamburguerRef.current?.contains(e.target as Node)
      ) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    function isTablet(): boolean {
      return width < 876;
    }

    if (!isTablet()) {
      setDrawerOpen(false);
    }
  }, [width]);

  function handleSignOut(): void {
    dispatch(signOut());
  }

  function closeDrawer(): void {
    setDrawerOpen(false);
  }

  return (
    <>
      <Container>
        <Navigation>
          <LogoLink to="/packages">
            <img src={logo} alt="FastFeet" />
          </LogoLink>

          <LinkList>
            {links.map(link => (
              <LinkItem key={link.label}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </LinkItem>
            ))}
          </LinkList>
        </Navigation>

        <Controls>
          <LogoutButton type="button" onClick={handleSignOut}>
            <IoIosLogOut />
            Sair do sistema
          </LogoutButton>
        </Controls>

        <Hamburguer
          open={drawerOpen}
          onClick={() => setDrawerOpen(!drawerOpen)}
          ref={hamburguerRef}
        />
      </Container>

      <Drawer open={drawerOpen} ref={drawerRef}>
        <DrawerLinkList>
          {links.map(link => (
            <DrawerLinkItem key={link.label}>
              <NavLink to={link.to} onClick={closeDrawer}>
                {link.label}
              </NavLink>
            </DrawerLinkItem>
          ))}

          <DrawerLinkItem isLogout>
            <button type="button" onClick={handleSignOut}>
              Sair do sistema
            </button>
          </DrawerLinkItem>
        </DrawerLinkList>
      </Drawer>
    </>
  );
};

export default Header;
