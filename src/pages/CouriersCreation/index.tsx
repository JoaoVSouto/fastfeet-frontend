import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
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
import AvatarInput from './components/AvatarInput';

import { FormGroup } from './styles';

interface IPayload {
  name: string;
  email: string;
  avatar: File | null;
}

const CouriersCreation: React.FC = () => {
  const formik = useFormik<IPayload>({
    initialValues: {
      name: '',
      email: '',
      avatar: null,
    },
    async onSubmit(payload) {
      const { avatar, email, name } = payload;

      const formData = new FormData();

      if (avatar) {
        formData.append('avatar', avatar);
      }

      formData.append('email', email);
      formData.append('name', name);

      try {
        await api.post('couriers', formData);

        toast.success('Entregador criado com sucesso!');
      } catch {
        toast.error('Erro ao criar entregador.');
      }
    },
  });

  function setAvatar(avatar: File | null): void {
    formik.setFieldValue('avatar', avatar);
  }

  return (
    <Container>
      <Row>
        <Title>Cadastro de entregadores</Title>

        <Actions>
          <BackButton type="button">
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
        <AvatarInput onChange={setAvatar} />

        <FormGroup>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CouriersCreation;
