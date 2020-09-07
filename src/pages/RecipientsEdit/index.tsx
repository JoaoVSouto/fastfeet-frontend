import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { useParams, useHistory } from 'react-router-dom';
import { MdDone, MdNavigateBefore } from 'react-icons/md';

import api from '../../services/api';

import { format } from '../../utils/format';

import {
  Container,
  Row,
  Title,
  Actions,
  BackButton,
  SaveButton,
  Form,
  Label,
  Input,
} from '../../components/EditCreationRelated';

import { FormRowAddress, FormRowCity, FormGroup } from './styles';

interface IRecipient {
  name: string;
  address_street: string;
  address_number: number;
  address_complement?: string;
  address_cep: string;
  uf: string;
  city: string;
}

const RecipientsEdit: React.FC = () => {
  const [recipient, setRecipient] = useState<IRecipient>({} as IRecipient);
  const [ufFullName, setUfFullName] = useState('');

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data: recipientData } = await api.get<IRecipient>(
        `recipients/${id}`
      );

      setRecipient(recipientData);

      const { data: ufFullNameData } = await api.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${recipientData.uf}`
      );

      setUfFullName(ufFullNameData.nome);
    })();
  }, [id]);

  function handleGoBack(): void {
    history.push('/recipients');
  }

  return (
    <Container>
      <Row>
        <Title>Edição de destinatário</Title>

        <Actions>
          <BackButton type="button" onClick={handleGoBack}>
            <MdNavigateBefore />
            Voltar
          </BackButton>
          <SaveButton type="button">
            <MdDone />
            Salvar
          </SaveButton>
        </Actions>
      </Row>

      <Form>
        <FormGroup>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder={recipient.name}
          />
        </FormGroup>

        <FormRowAddress>
          <FormGroup grow>
            <Label htmlFor="street">Rua</Label>
            <Input
              type="text"
              id="street"
              name="address_street"
              placeholder={recipient.address_street}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address_number">Número</Label>
            <Input
              as={InputMask}
              id="address_number"
              name="address_number"
              placeholder={String(recipient.address_number)}
              mask="9999"
              maskPlaceholder={'\u2007'}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address_complement">Complemento</Label>
            <Input
              type="text"
              id="address_complement"
              name="address_complement"
              placeholder={recipient.address_complement}
            />
          </FormGroup>
        </FormRowAddress>

        <FormRowCity>
          <FormGroup>
            <Label>Estado</Label>
            <Select
              placeholder={ufFullName || recipient.uf}
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum estado encontrado.'}
            />
          </FormGroup>
          <FormGroup>
            <Label>Cidade</Label>
            <Select
              placeholder={recipient.city || ''}
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhuma cidade encontrada.'}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="cep">CEP</Label>
            <Input
              as={InputMask}
              id="cep"
              name="address_cep"
              placeholder={format.cep(recipient.address_cep)}
              mask="99999-999"
              maskPlaceholder={'\u2007'}
            />
          </FormGroup>
        </FormRowCity>
      </Form>
    </Container>
  );
};

export default RecipientsEdit;
