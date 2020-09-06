import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Select, { ValueType } from 'react-select';
import { useFormik } from 'formik';
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

interface IIBGECityResponse {
  id: number;
  nome: string;
}

interface IPayload {
  uf: string;
  city: string;
}

const RecipientsCreation: React.FC = () => {
  const history = useHistory();

  const [ufs, setUfs] = useState<ISelect[]>([]);
  const [cities, setCities] = useState<ISelect[]>([]);

  function handleRecipientCreation(payload: IPayload): void {
    console.log(payload);
  }

  const formik = useFormik<IPayload>({
    initialValues: {
      uf: '',
      city: '',
    },
    onSubmit: handleRecipientCreation,
  });

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

  async function getCityOptions(uf: string): Promise<ISelect[]> {
    const { data } = await api.get<IIBGECityResponse[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );

    const citiesTreated = data.map(city => ({
      value: city.nome,
      label: city.nome,
    }));

    return citiesTreated;
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

  async function handleUFChange(value: ValueType<ISelect>): Promise<void> {
    const option: ISelect = value as ISelect;

    const uf = option.value;

    formik.setFieldValue('uf', uf);
    formik.setFieldValue('city', '');

    const incomingCities = await getCityOptions(uf);
    setCities(incomingCities);
  }

  function handleCityChange(value: ValueType<ISelect>): void {
    const option: ISelect = value as ISelect;

    const city = option.value;

    formik.setFieldValue('city', city);
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
          <SaveButton type="button" onClick={() => formik.handleSubmit()}>
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
              onChange={handleUFChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Cidade</Label>
            <Select
              value={{ label: formik.values.city, value: formik.values.city }}
              options={cities}
              placeholder=""
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhuma cidade encontrada.'}
              onChange={handleCityChange}
            />
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
