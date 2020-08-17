import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import {
  Container,
  Title,
  Controls,
  SearchInput,
  RegisterLink,
} from './styles';

const PackagesDashboard: React.FC = () => {
  return (
    <Container>
      <Title>Gerenciando encomendas</Title>

      <Controls>
        <SearchInput />
        <RegisterLink as={Link} to="/packages/register">
          <MdAdd />
          Cadastrar
        </RegisterLink>
      </Controls>
    </Container>
  );
};

export default PackagesDashboard;
