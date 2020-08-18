import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';

import {
  Container,
  Title,
  Controls,
  SearchContainer,
  SearchInput,
  RegisterLink,
} from './styles';

const PackagesDashboard: React.FC = () => {
  return (
    <Container>
      <Title>Gerenciando encomendas</Title>

      <Controls>
        <SearchContainer>
          <MdSearch />
          <SearchInput type="text" placeholder="Buscar por encomendas" />
        </SearchContainer>
        <RegisterLink as={Link} to="/packages/register">
          <MdAdd />
          Cadastrar
        </RegisterLink>
      </Controls>
    </Container>
  );
};

export default PackagesDashboard;
