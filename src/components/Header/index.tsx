import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';

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
        <LogoutButton type="button">
          <IoIosLogOut />
          Sair do sistema
        </LogoutButton>
      </Controls>
    </Container>
  );
};

export default Header;
