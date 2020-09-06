import React from 'react';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { MdDone, MdNavigateBefore } from 'react-icons/md';

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

const RecipientsEdit: React.FC = () => {
  return (
    <Container>
      <Row>
        <Title>Edição de destinatário</Title>

        <Actions>
          <BackButton type="button">
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
          <Input type="text" id="name" name="name" />
        </FormGroup>

        <FormRowAddress>
          <FormGroup grow>
            <Label htmlFor="street">Rua</Label>
            <Input type="text" id="street" name="address_street" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="address_number">Número</Label>
            <Input
              as={InputMask}
              id="address_number"
              name="address_number"
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
            />
          </FormGroup>
        </FormRowAddress>

        <FormRowCity>
          <FormGroup>
            <Label>Estado</Label>
            <Select
              placeholder=""
              classNamePrefix="ReactSelect"
              loadingMessage={() => 'Carregando...'}
              noOptionsMessage={() => 'Nenhum estado encontrado.'}
            />
          </FormGroup>
          <FormGroup>
            <Label>Cidade</Label>
            <Select
              placeholder=""
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
              mask="99999-999"
              maskPlaceholder={'\u2007'}
              name="address_cep"
            />
          </FormGroup>
        </FormRowCity>
      </Form>
    </Container>
  );
};

export default RecipientsEdit;
