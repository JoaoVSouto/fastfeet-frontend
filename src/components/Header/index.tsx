import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';

import { signOut } from '../../store/modules/auth/actions';

import {
  Container,
  Navigation,
  Controls,
  LogoLink,
  LinkItem,
  LinkList,
  LogoutButton,
  Hamburguer,
  Drawer,
  DrawerLinkList,
  DrawerLinkItem,
} from './styles';

import logo from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);

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
            <LinkItem>
              <NavLink to="/packages">Encomendas</NavLink>
            </LinkItem>
            <LinkItem>
              <a href="#!">Entregadores</a>
            </LinkItem>
            <LinkItem>
              <a href="#!">Destinatários</a>
            </LinkItem>
            <LinkItem>
              <a href="#!">Problemas</a>
            </LinkItem>
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
        >
          <span />
          <span />
          <span />
          <span />
        </Hamburguer>
      </Container>

      <Drawer open={drawerOpen} ref={drawerRef}>
        <DrawerLinkList>
          <DrawerLinkItem>
            <NavLink to="/packages" onClick={closeDrawer}>
              Encomendas
            </NavLink>
          </DrawerLinkItem>
          <DrawerLinkItem>
            <a href="#!" onClick={closeDrawer}>
              Entregadores
            </a>
          </DrawerLinkItem>
          <DrawerLinkItem>
            <a href="#!" onClick={closeDrawer}>
              Destinatários
            </a>
          </DrawerLinkItem>
          <DrawerLinkItem>
            <a href="#!" onClick={closeDrawer}>
              Problemas
            </a>
          </DrawerLinkItem>

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
