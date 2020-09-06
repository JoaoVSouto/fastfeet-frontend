import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { MdDone, MdNavigateBefore } from 'react-icons/md';

import api from '../../services/api';

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

interface ISelect {
  value: string;
  label: string;
}

interface IIBGEUFResponse {
  id: number;
  sigla: string;
  nome: string;
}

const RecipientsCreation: React.FC = () => {
  const history = useHistory();

  const [ufs, setUfs] = useState<ISelect[]>([]);

  async function getUfOptions(): Promise<ISelect[]> {
    const { data } = await api.get<IIBGEUFResponse[]>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    );

    const ufsTreated = data.map(uf => ({
      value: uf.sigla,
      label: uf.nome,
    }));

    return ufsTreated;
  }

  useEffect(() => {
    (async () => {
      const incomingUfs = await getUfOptions();

      setUfs(incomingUfs);
    })();
  }, []);

  function handleGoBack(): void {
    history.push('/recipients');
  }

  return (
    <Container>
      <Row>
        <Title>Cadastro de destinatário</Title>

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
          <Input type="text" id="name" />
        </FormGroup>

        <FormRowAddress>
          <FormGroup grow>
            <Label htmlFor="street">Rua</Label>
            <Input type="text" id="street" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address_number">Número</Label>
            <Input
              as={InputMask}
              id="address_number"
              mask="9999"
              maskPlaceholder={'\u2007'}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address_complement">Complemento</Label>
            <Input type="text" id="address_complement" />
          </FormGroup>
        </FormRowAddress>

        <FormRowCity>
          <FormGroup>
            <Label>Estado</Label>
            <Select
              options={ufs}
              placeholder=""
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum estado encontrado.'}
              onChange={console.log}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="city">Cidade</Label>
            <Input type="text" id="city" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="cep">CEP</Label>
            <Input
              as={InputMask}
              id="cep"
              mask="99999-999"
              maskPlaceholder={'\u2007'}
            />
          </FormGroup>
        </FormRowCity>
      </Form>
    </Container>
  );
};

export default RecipientsCreation;
