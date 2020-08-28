import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
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
  Error,
} from '../../components/EditCreationRelated';
import AvatarInput from './components/AvatarInput';

import { FormGroup } from './styles';

interface IPayload {
  name: string;
  email: string;
  avatar: File | null;
}

const CouriersCreationSchema = Yup.object().shape({
  name: Yup.string().required('Nome não preenchido'),
  email: Yup.string().email('Email inválido').required('Email não preenchido'),
});

const CouriersCreation: React.FC = () => {
  const history = useHistory();

  const formik = useFormik<IPayload>({
    initialValues: {
      name: '',
      email: '',
      avatar: null,
    },
    validationSchema: CouriersCreationSchema,
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

        history.push('/couriers');
        toast.success('Entregador criado com sucesso!');
      } catch {
        toast.error('Erro ao criar entregador.');
      }
    },
  });

  function setAvatar(avatar: File | null): void {
    formik.setFieldValue('avatar', avatar);
  }

  function handleGoBack(): void {
    history.push('/couriers');
  }

  return (
    <Container>
      <Row>
        <Title>Cadastro de entregadores</Title>

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
          {formik.touched.name && formik.errors.name && (
            <Error>{formik.errors.name}</Error>
          )}
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
          {formik.touched.email && formik.errors.email && (
            <Error>{formik.errors.email}</Error>
          )}
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CouriersCreation;
