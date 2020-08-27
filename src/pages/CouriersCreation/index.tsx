import React from 'react';
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
import AvatarInput from './components/AvatarInput';

import { FormGroup } from './styles';

const CouriersCreation: React.FC = () => {
  return (
    <Container>
      <Row>
        <Title>Cadastro de entregadores</Title>

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
        <AvatarInput />

        <FormGroup>
          <Label htmlFor="name">Nome</Label>
          <Input type="text" id="name" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="text" id="email" />
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CouriersCreation;
