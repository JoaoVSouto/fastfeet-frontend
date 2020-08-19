import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdSearch,
  MdMoreHoriz,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import { randomTheme } from '../../utils/getRandomTheme';
import { getNameInitials } from '../../utils/getNameInitials';

import api from '../../services/api';

import {
  Container,
  Title,
  Controls,
  SearchContainer,
  SearchInput,
  RegisterLink,
  ImagePlaceholder,
  Table,
  Status,
  Dropdown,
} from './styles';

export interface IPackage {
  id: number;
  canceled_at?: string;
  start_date?: string;
  end_date?: string;
  recipient: {
    name: string;
    uf: string;
    city: string;
  };
  courier: {
    name: string;
    avatar?: {
      path: string;
      url: string;
    };
  };
  status: 'entregue' | 'pendente' | 'retirada' | 'cancelada';
}

const PackagesDashboard: React.FC = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('packages');
      setPackages(response.data);
    })();
  }, []);

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

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {packages.map(pkg => (
            <tr key={pkg.id}>
              <td>{`#${String(pkg.id).padStart(2, '0')}`}</td>
              <td>{pkg.recipient.name}</td>
              <td>
                <span>
                  <span className="img-container">
                    {pkg.courier.avatar ? (
                      <img
                        src={pkg.courier.avatar.url}
                        alt={pkg.courier.name}
                      />
                    ) : (
                      <ImagePlaceholder colorTheme={randomTheme()}>
                        {getNameInitials(pkg.courier.name)}
                      </ImagePlaceholder>
                    )}
                  </span>
                  {pkg.courier.name}
                </span>
              </td>
              <td>{pkg.recipient.city}</td>
              <td>{pkg.recipient.uf}</td>
              <td>
                <Status status={pkg.status}>{pkg.status}</Status>
              </td>
              <td>
                <button type="button">
                  <MdMoreHoriz />
                </button>

                <Dropdown>
                  <button type="button" className="view">
                    <MdRemoveRedEye />
                    Visualizar
                  </button>
                  <a href="#!" className="edit">
                    <MdEdit />
                    Editar
                  </a>
                  <button type="button" className="delete">
                    <MdDeleteForever />
                    Excluir
                  </button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PackagesDashboard;
