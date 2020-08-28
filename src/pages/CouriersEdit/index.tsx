import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
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

interface ICourier {
  name: string;
  email: string;
  avatar?: {
    url: string;
  };
}

interface IPayload {
  name: string;
  email: string;
  avatar: File | null;
}

const CouriersEditSchema = Yup.object().shape({
  name: Yup.string().required('Nome não preenchido'),
  email: Yup.string().email('Email inválido').required('Email não preenchido'),
});

const CouriersEdit: React.FC = () => {
  const [courierAvatar, setCourierAvatar] = useState('');

  const { id } = useParams();
  const history = useHistory();

  const formik = useFormik<IPayload>({
    initialValues: {
      name: '',
      email: '',
      avatar: null,
    },
    validationSchema: CouriersEditSchema,
    async onSubmit(payload) {
      console.log(payload, id);
    },
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.get<ICourier>(`couriers/${id}`);

      setCourierAvatar(data.avatar?.url || '');

      formik.setFieldValue('name', data.name);
      formik.setFieldValue('email', data.email);
    })();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  function setAvatar(avatar: File | null): void {
    formik.setFieldValue('avatar', avatar);
  }

  function handleGoBack(): void {
    history.push('/couriers');
  }

  return (
    <Container>
      <Row>
        <Title>Edição de entregadores</Title>

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
        <AvatarInput onChange={setAvatar} initialImage={courierAvatar} />

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

export default CouriersEdit;
