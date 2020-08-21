import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdSearch,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import { randomTheme } from '../../utils/getRandomTheme';
import { getNameInitials } from '../../utils/getNameInitials';

import { useWindowSize } from '../../hooks/useWindowSize';

import api from '../../services/api';

import Actions from '../../components/Actions';
import Table from '../../components/Table';
import Card, { CardsContainer } from '../../components/Card';
import Highlight from '../../components/Highlight';

import {
  Container,
  Title,
  Controls,
  SearchContainer,
  SearchInput,
  RegisterLink,
  ImageContainer,
  ImagePlaceholder,
  ActionsContainer,
  Status,
} from './styles';

export interface IPackage {
  id: number;
  canceled_at?: string;
  start_date?: string;
  end_date?: string;
  product: string;
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
  colorTheme: string;
}

const PackagesDashboard: React.FC = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [packagesSearch, setPackagesSearch] = useState('');

  const { width } = useWindowSize();

  const isDesktop = useMemo(() => {
    function isDesktopScreen(): boolean {
      return width >= 992;
    }

    if (isDesktopScreen()) {
      return true;
    }

    return false;
  }, [width]);

  useEffect(() => {
    (async () => {
      const response = await api.get('packages', {
        params: { q: packagesSearch },
      });

      const packagesWithThemes = response.data.map((pkg: IPackage) => ({
        ...pkg,
        colorTheme: randomTheme(),
      }));

      setPackages(packagesWithThemes);
    })();
  }, [packagesSearch]);

  return (
    <Container>
      <Title>Gerenciando encomendas</Title>

      <Controls>
        <SearchContainer>
          <MdSearch />
          <SearchInput
            type="text"
            placeholder="Buscar por encomendas"
            value={packagesSearch}
            onChange={e => setPackagesSearch(e.target.value)}
          />
        </SearchContainer>
        <RegisterLink as={Link} to="/packages/register">
          <MdAdd />
          Cadastrar
        </RegisterLink>
      </Controls>

      {isDesktop ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Produto</th>
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
                  <Highlight toHighlight={packagesSearch}>
                    {pkg.product}
                  </Highlight>
                </td>
                <td>
                  <span>
                    <ImageContainer>
                      {pkg.courier.avatar ? (
                        <img
                          src={pkg.courier.avatar.url}
                          alt={pkg.courier.name}
                        />
                      ) : (
                        <ImagePlaceholder colorTheme={pkg.colorTheme}>
                          {getNameInitials(pkg.courier.name)}
                        </ImagePlaceholder>
                      )}
                    </ImageContainer>
                    {pkg.courier.name}
                  </span>
                </td>
                <td>{pkg.recipient.city}</td>
                <td>{pkg.recipient.uf}</td>
                <td>
                  <Status status={pkg.status}>{pkg.status}</Status>
                </td>
                <td>
                  <Actions>
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
                  </Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <CardsContainer>
          {packages.map(pkg => (
            <Card key={pkg.id}>
              <ActionsContainer>
                <Actions isMobile>
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
                </Actions>
              </ActionsContainer>

              <div className="card-row">
                <strong>ID</strong>
                {`#${String(pkg.id).padStart(2, '0')}`}
              </div>

              <div className="card-row">
                <strong>Destinatário</strong>
                {pkg.recipient.name}
              </div>

              <div className="card-row">
                <strong>Produto</strong>
                {pkg.product}
              </div>

              <div className="card-row">
                <strong>Entregador</strong>
                <ImageContainer>
                  {pkg.courier.avatar ? (
                    <img src={pkg.courier.avatar.url} alt={pkg.courier.name} />
                  ) : (
                    <ImagePlaceholder colorTheme={pkg.colorTheme}>
                      {getNameInitials(pkg.courier.name)}
                    </ImagePlaceholder>
                  )}
                </ImageContainer>
                {pkg.courier.name}
              </div>

              <div className="card-row">
                <strong>Cidade</strong>
                {pkg.recipient.city}
              </div>

              <div className="card-row">
                <strong>Estado</strong>
                {pkg.recipient.uf}
              </div>

              <div className="card-row">
                <strong>Status</strong>
                <Status status={pkg.status}>{pkg.status}</Status>
              </div>
            </Card>
          ))}
        </CardsContainer>
      )}
    </Container>
  );
};

export default PackagesDashboard;
