import React, { useState, useEffect } from 'react';
import Select from 'react-select/async';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
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

interface IPerson {
  id: number;
  name: string;
}

interface ISelect {
  value: string;
  label: string;
}

interface IPackage {
  id: number;
  product: string;
  recipient: {
    name: string;
  };
  courier: {
    name: string;
  };
}

const PackagesEdit: React.FC = () => {
  const [packageInfo, setPackageInfo] = useState<IPackage>({} as IPackage);
  const [productName, setProductName] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<ISelect>(
    {} as ISelect
  );
  const [selectedCourier, setSelectedCourier] = useState<ISelect>(
    {} as ISelect
  );

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await api.get(`packages/${id}`);
      setPackageInfo(response.data);
    })();
  }, [id]);

  async function handleUpdate(): Promise<void> {
    try {
      const payload = {
        id,
        courier_id: Number(selectedCourier.value),
        recipient_id: Number(selectedRecipient.value),
        product: productName,
      };

      const payloadWithoutFalsyFields = Object.fromEntries(
        Object.entries(payload).filter(entry => Boolean(entry[1]))
      );

      await api.put('packages', payloadWithoutFalsyFields);

      history.push('/packages');
      toast.success('Encomenda atualizada com sucesso!');
    } catch {
      toast.error('Erro ao atualizar encomenda.');
    }
  }

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

  return (
    <Container>
      <Row>
        <Title>Edição de encomendas</Title>

        <div>
          <BackButton onClick={handleGoBack}>
            <MdNavigateBefore />
            Voltar
          </BackButton>
          <SaveButton onClick={handleUpdate}>
            <MdDone />
            Salvar
          </SaveButton>
        </div>
      </Row>

      <Form>
        <Fieldset>
          <FormGroup>
            <Label>Destinatário</Label>
            <Select
              loadOptions={search('recipients')}
              cacheOptions
              defaultOptions
              placeholder={packageInfo.recipient?.name || ''}
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum destinatário encontrado.'}
              onChange={option => setSelectedRecipient(option as ISelect)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Entregador</Label>
            <Select
              loadOptions={search('couriers')}
              cacheOptions
              defaultOptions
              placeholder={packageInfo.courier?.name || ''}
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum entregador encontrado.'}
              onChange={option => setSelectedCourier(option as ISelect)}
            />
          </FormGroup>
        </Fieldset>

        <FormGroup>
          <Label htmlFor="product-name">Nome do produto</Label>
          <Input
            type="text"
            id="product-name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder={packageInfo.product || ''}
          />
        </FormGroup>
      </Form>
    </Container>
  );
};

export default PackagesEdit;
