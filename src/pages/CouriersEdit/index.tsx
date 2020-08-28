import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { MdDone, MdNavigateBefore } from 'react-icons/md';

import api from '../../services/api';

import { getRandomTheme, Theme } from '../../utils/getRandomTheme';
import { getNameInitials } from '../../utils/getNameInitials';
import { removeFalsyFields } from '../../utils/removeFalsyFields';
import { convert } from '../../utils/convert';

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

export interface ICourierDisplay {
  initials: string;
  theme: Theme;
}

const CouriersEditSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido'),
});

const CouriersEdit: React.FC = () => {
  const [courierAvatar, setCourierAvatar] = useState('');
  const [courierDisplay, setCourierDisplay] = useState<ICourierDisplay>({
    initials: '',
    theme: getRandomTheme(),
  });
  const [placeholders, setPlaceholders] = useState({ name: '', email: '' });

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
      const payloadWithoutFalsyFields = removeFalsyFields<IPayload>(payload);

      const formData = convert.objectToFormData({
        ...payloadWithoutFalsyFields,
        id,
      });

      try {
        await api.put('couriers', formData);

        history.push('/couriers');
        toast.success('Entregador atualizado com sucesso!');
      } catch {
        toast.error('Erro ao atualizar entregador.');
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<ICourier>(`couriers/${id}`);

        setCourierAvatar(data.avatar?.url || '');
        setCourierDisplay(state => ({
          ...state,
          initials: getNameInitials(data.name),
        }));
        setPlaceholders({
          email: data.email,
          name: data.name,
        });
      } catch (err) {
        if (err.response?.status === 404) {
          history.push('/couriers');
          toast.error('Entregador não encontrado.');
        }
      }
    })();
  }, [id, history]);

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
        <AvatarInput
          onChange={setAvatar}
          initialImage={courierAvatar}
          courierDisplay={courierDisplay}
        />

        <FormGroup>
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder={placeholders.name}
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
            placeholder={placeholders.email}
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
