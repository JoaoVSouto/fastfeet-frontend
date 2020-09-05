import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import debounce from 'lodash.debounce';

import api from '../../services/api';

import {
  Container,
  Title,
  Controls,
  SearchContainer,
  SearchInput,
  RegisterLink,
  NotFound,
} from '../../components/DashboardRelated';
import DataDisplay from './components/DataDisplay';

export interface IRecipient {
  id: number;
  name: string;
  address_street: string;
  address_number: number;
  address_complement?: string;
  uf: string;
  city: string;
}

const RecipientsDashboard: React.FC = () => {
  const [recipients, setRecipients] = useState<IRecipient[]>([]);
  const [recipientsSearch, setRecipientsSearch] = useState('');

  async function retrieveRecipients(search = ''): Promise<void> {
    const { data } = await api.get<IRecipient[]>('recipients', {
      params: { q: search },
    });

    setRecipients(data);
  }

  const retrieveRecipientsDebounced = useMemo(
    () =>
      debounce(
        (recipientSearch: string) => retrieveRecipients(recipientSearch),
        300
      ),
    []
  );

  useEffect(() => {
    retrieveRecipients();
  }, []);

  function handleRecipientsSearchChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    const { value } = e.target;

    setRecipientsSearch(value);

    retrieveRecipientsDebounced(value);
  }

  return (
    <Container>
      <Title>Gerenciando destinatários</Title>

      <Controls>
        <SearchContainer>
          <MdSearch />
          <SearchInput
            type="text"
            placeholder="Buscar por destinatários"
            value={recipientsSearch}
            onChange={handleRecipientsSearchChange}
          />
        </SearchContainer>
        <RegisterLink as={Link} to="/recipients/create">
          <MdAdd />
          Cadastrar
        </RegisterLink>
      </Controls>

      {recipients.length === 0 ? (
        <NotFound>
          Nenhum destinatário encontrado&nbsp;
          <span role="img" aria-label="expressão triste">
            😢
          </span>
        </NotFound>
      ) : (
        <DataDisplay
          recipients={recipients}
          recipientsSearch={recipientsSearch}
        />
      )}
    </Container>
  );
};

export default RecipientsDashboard;
