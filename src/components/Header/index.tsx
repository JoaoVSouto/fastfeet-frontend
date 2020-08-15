import React, { useState } from 'react';
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

  function handleSignOut(): void {
    dispatch(signOut());
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
        >
          <span />
          <span />
          <span />
          <span />
        </Hamburguer>
      </Container>

      <Drawer open={drawerOpen}>
        <DrawerLinkList>
          <DrawerLinkItem>
            <NavLink to="/packages">Encomendas</NavLink>
          </DrawerLinkItem>
          <DrawerLinkItem>
            <a href="#!">Entregadores</a>
          </DrawerLinkItem>
          <DrawerLinkItem>
            <a href="#!">Destinatários</a>
          </DrawerLinkItem>
          <DrawerLinkItem>
            <a href="#!">Problemas</a>
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
