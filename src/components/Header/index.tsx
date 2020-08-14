import React from 'react';
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
} from './styles';

import logo from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const dispatch = useDispatch();

  function handleSignOut(): void {
    dispatch(signOut());
  }

  return (
    <Container>
      <Navigation>
        <LogoLink href="#!">
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
    </Container>
  );
};

export default Header;
