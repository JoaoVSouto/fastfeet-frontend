import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import Select, { ValueType } from 'react-select';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
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

const RecipientsEdit: React.FC = () => {
  const [recipient, setRecipient] = useState<IRecipient>({} as IRecipient);
  const [ufFullName, setUfFullName] = useState('');
  const [ufs, setUfs] = useState<ISelect[]>([]);
  const [cities, setCities] = useState<ISelect[]>([]);

  const { id } = useParams();
  const history = useHistory();

  function handleRecipientUpdate(payload: StringMap<IRecipient>): void {
    console.log(payload);
  }

  const formik = useFormik<StringMap<IRecipient>>({
    initialValues: {
      name: '',
      address_street: '',
      address_number: '',
      address_cep: '',
      address_complement: '',
      uf: '',
      city: '',
    },
    onSubmit: handleRecipientUpdate,
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
        <Title>Edição de destinatário</Title>

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
          <Input
            type="text"
            id="name"
            name="name"
            placeholder={recipient.name}
            value={formik.values.name}
            onChange={formik.handleChange}
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
              value={formik.values.address_street}
              onChange={formik.handleChange}
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
              value={formik.values.address_number}
              onChange={formik.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address_complement">Complemento</Label>
            <Input
              type="text"
              id="address_complement"
              name="address_complement"
              placeholder={recipient.address_complement}
              value={formik.values.address_complement}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </FormRowAddress>

        <FormRowCity>
          <FormGroup>
            <Label>Estado</Label>
            <Select
              options={ufs}
              placeholder={ufFullName || recipient.uf}
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum estado encontrado.'}
              onChange={handleUFChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Cidade</Label>
            <Select
              value={
                formik.values.city
                  ? {
                      label: formik.values.city,
                      value: formik.values.city,
                    }
                  : null
              }
              options={cities}
              placeholder={recipient.city || ''}
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
              name="address_cep"
              placeholder={format.cep(recipient.address_cep)}
              mask="99999-999"
              maskPlaceholder={'\u2007'}
              value={formik.values.address_cep}
              onChange={formik.handleChange}
            />
          </FormGroup>
        </FormRowCity>
      </Form>
    </Container>
  );
};

export default RecipientsEdit;
