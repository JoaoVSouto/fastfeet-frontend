import React from 'react';
import { ValueType, ActionMeta } from 'react-select';
import Select from 'react-select/async';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  FormGroup,
  Fieldset,
  Label,
  Input,
} from './styles';

interface IPerson {
  id: number;
  name: string;
}

interface ISelect {
  value: string;
  label: string;
}

interface IPayload {
  product: string;
  recipient_id: number;
  courier_id: number;
}

const PackagesCreation: React.FC = () => {
  const history = useHistory();

  async function handleCreation(payload: IPayload): Promise<void> {
    try {
      await api.post('packages', payload);

      history.push('/packages');
      toast.success('Encomenda criada com sucesso!');
    } catch {
      toast.error('Erro ao criar encomenda.');
    }
  }

  const formik = useFormik<IPayload>({
    initialValues: {
      product: '',
      courier_id: NaN,
      recipient_id: NaN,
    },
    onSubmit: handleCreation,
  });

  function handleGoBack(): void {
    history.push('/packages');
  }

  function search(entity: string) {
    return async function executeSearch(searchValue = '') {
      const { data } = await api.get<IPerson[]>(entity, {
        params: { q: searchValue },
      });

      const dataTreated = data.map(person => ({
        value: String(person.id),
        label: person.name,
      }));

      return dataTreated;
    };
  }

  function setFieldValue(field: string) {
    return function handleChange(value: ValueType<ISelect>) {
      const option: ISelect = value as ISelect;

      formik.setFieldValue(field, Number(option.value));
    };
  }

  return (
    <Container>
      <Row>
        <Title>Cadastro de encomendas</Title>

        <Actions>
          <BackButton onClick={handleGoBack}>
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
        <Fieldset>
          <FormGroup>
            <Label>Destinatário</Label>
            <Select
              loadOptions={search('recipients')}
              cacheOptions
              defaultOptions
              placeholder=""
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum destinatário encontrado.'}
              onChange={setFieldValue('recipient_id')}
            />
          </FormGroup>

          <FormGroup>
            <Label>Entregador</Label>
            <Select
              loadOptions={search('couriers')}
              cacheOptions
              defaultOptions
              placeholder=""
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum entregador encontrado.'}
              onChange={setFieldValue('courier_id')}
            />
          </FormGroup>
        </Fieldset>

        <FormGroup>
          <Label htmlFor="product-name">Nome do produto</Label>
          <Input
            type="text"
            id="product-name"
            name="product"
            value={formik.values.product}
            onChange={formik.handleChange}
          />
        </FormGroup>
      </Form>
    </Container>
  );
};

export default PackagesCreation;
