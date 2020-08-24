import React, { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import debounce from 'lodash.debounce';

import { randomTheme } from '../../utils/getRandomTheme';

import api from '../../services/api';

import DataDisplay from './components/DataDisplay';

import {
  Container,
  Title,
  Controls,
  SearchContainer,
  SearchInput,
  RegisterLink,
  NotFound,
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

  async function retrievePackages(search = ''): Promise<void> {
    const response = await api.get('packages', {
      params: { q: search },
    });

    const packagesWithThemes = response.data.map((pkg: IPackage) => ({
      ...pkg,
      colorTheme: randomTheme(),
    }));

    setPackages(packagesWithThemes);
  }

  const retrievePackagesDebounced = useMemo(
    () => debounce((pkgSearch: string) => retrievePackages(pkgSearch), 300),
    []
  );

  useEffect(() => {
    retrievePackages();
  }, []);

  function handlePackagesSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;

    setPackagesSearch(value);

    retrievePackagesDebounced(value);
  }

  function removePackage(packageId: number): void {
    setPackages(packages.filter(pkg => pkg.id !== packageId));
  }

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
            onChange={handlePackagesSearchChange}
          />
        </SearchContainer>
        <RegisterLink as={Link} to="/packages/register">
          <MdAdd />
          Cadastrar
        </RegisterLink>
      </Controls>

      {packages.length === 0 ? (
        <NotFound>
          Nenhuma encomenda encontrada&nbsp;
          <span role="img" aria-label="expressão triste">
            😢
          </span>
        </NotFound>
      ) : (
        <DataDisplay
          packages={packages}
          packagesSearch={packagesSearch}
          removePackage={removePackage}
        />
      )}
    </Container>
  );
};

export default PackagesDashboard;
