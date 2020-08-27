import React, { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import debounce from 'lodash.debounce';

import { randomTheme } from '../../utils/getRandomTheme';

import api from '../../services/api';

import {
  Container,
  Title,
  Controls,
  SearchContainer,
  SearchInput,
  RegisterLink,
  NotFound,
} from '../../components/Dashboard';
import DataDisplay from './components/DataDisplay';

export interface ICourier {
  id: number;
  name: string;
  email: string;
  avatar?: {
    url: string;
  };
  colorTheme: string;
}

const CouriersDashboard: React.FC = () => {
  const [couriers, setCouriers] = useState<ICourier[]>([]);
  const [couriersSearch, setCouriersSearch] = useState('');

  async function retrieveCouriers(search = ''): Promise<void> {
    const response = await api.get('couriers', {
      params: { q: search },
    });

    const couriersWithThemes = response.data.map((courier: ICourier) => ({
      ...courier,
      colorTheme: randomTheme(),
    }));

    setCouriers(couriersWithThemes);
  }

  const retrieveCouriersDebounced = useMemo(
    () =>
      debounce((courierSearch: string) => retrieveCouriers(courierSearch), 300),
    []
  );

  useEffect(() => {
    retrieveCouriers();
  }, []);

  function handleCouriersSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;

    setCouriersSearch(value);

    retrieveCouriersDebounced(value);
  }

  function removeCourier(courierId: number): void {
    setCouriers(couriers.filter(courier => courier.id !== courierId));
  }

  return (
    <Container>
      <Title>Gerenciando entregadores</Title>

      <Controls>
        <SearchContainer>
          <MdSearch />
          <SearchInput
            type="text"
            placeholder="Buscar por entregadores"
            value={couriersSearch}
            onChange={handleCouriersSearchChange}
          />
        </SearchContainer>
        <RegisterLink as={Link} to="/couriers/create">
          <MdAdd />
          Cadastrar
        </RegisterLink>
      </Controls>

      {couriers.length === 0 ? (
        <NotFound>
          Nenhum entregador encontrado&nbsp;
          <span role="img" aria-label="expressão triste">
            😢
          </span>
        </NotFound>
      ) : (
        <DataDisplay
          couriers={couriers}
          couriersSearch={couriersSearch}
          removeCourier={removeCourier}
        />
      )}
    </Container>
  );
};

export default CouriersDashboard;
