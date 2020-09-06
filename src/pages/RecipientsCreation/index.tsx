import React from 'react';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
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
  Error,
} from '../../components/EditCreationRelated';

import { FormRowAddress, FormRowCity, FormGroup } from './styles';

const RecipientsCreation: React.FC = () => {
  const history = useHistory();

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
            <Label htmlFor="uf">Estado</Label>
            <Input type="text" id="uf" />
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
