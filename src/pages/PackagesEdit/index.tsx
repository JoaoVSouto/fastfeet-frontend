import React, { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
// import { useParams } from 'react-router-dom';
import { MdDone, MdNavigateBefore } from 'react-icons/md';

import api from '../../services/api';

import {
  Container,
  Row,
  Title,
  BackButton,
  SaveButton,
  Form,
  FormGroup,
  Fieldset,
  Label,
  Input,
} from './styles';

interface IRecipient {
  id: number;
  name: string;
}

interface ISelect {
  value: string;
  label: string;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const PackagesEdit: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<
    typeof options[0] | null
  >(null);
  // const { id } = useParams();

  async function searchRecipients(searchValue = ''): Promise<ISelect[]> {
    const { data } = await api.get<IRecipient[]>('recipients', {
      params: { q: searchValue },
    });

    const recipientsTreated = data.map(recipient => ({
      value: String(recipient.id),
      label: recipient.name,
    }));

    return recipientsTreated;
  }

  return (
    <Container>
      <Row>
        <Title>Edição de encomendas</Title>

        <div>
          <BackButton>
            <MdNavigateBefore />
            Voltar
          </BackButton>
          <SaveButton>
            <MdDone />
            Salvar
          </SaveButton>
        </div>
      </Row>

      <Form>
        <Fieldset>
          <FormGroup>
            <Label>Destinatário</Label>
            <AsyncSelect
              loadOptions={searchRecipients}
              cacheOptions
              defaultOptions
              placeholder="Ludwig van Beethoven"
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum destinatário encontrado.'}
            />
          </FormGroup>

          <FormGroup>
            <Label>Entregador</Label>
            <Select
              value={selectedOption}
              placeholder="John Doe"
              onChange={option =>
                setSelectedOption(option as typeof options[0])}
              options={options}
              classNamePrefix="ReactSelect"
            />
          </FormGroup>
        </Fieldset>

        <FormGroup>
          <Label htmlFor="product-name">Nome do produto</Label>
          <Input type="text" id="product-name" placeholder="Yamaha SX7" />
        </FormGroup>
      </Form>
    </Container>
  );
};

export default PackagesEdit;
