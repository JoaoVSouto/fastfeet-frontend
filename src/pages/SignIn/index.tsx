import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoIosCheckmark } from 'react-icons/io';

import { signInRequest } from '../../store/modules/auth/actions';

import TeaLoading from '../../components/TeaLoading';

import {
  Container,
  LoadingWrapper,
  Logo,
  Form,
  Checkbox,
  CheckboxLabel,
  Input,
  InputBlock,
  Label,
  Error,
  SubmitButton,
} from './styles';

import logo from '../../assets/images/logo.png';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail não preenchido'),
  password: Yup.string().required('Senha não preenchida'),
});

const SignIn: React.FC = () => {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: SignInSchema,
    onSubmit: ({ email, password, rememberMe }) => {
      dispatch(signInRequest(email, password, rememberMe));
    },
  });

  return (
    <Container>
      <Logo src={logo} alt="FastFeet" />

      <Form onSubmit={formik.handleSubmit}>
        <InputBlock>
          <Label htmlFor="email">Seu e-mail</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="exemplo@email.com"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Error>{formik.errors.email}</Error>
          )}
        </InputBlock>

        <InputBlock>
          <Label htmlFor="password">Sua senha</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="*************"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <Error>{formik.errors.password}</Error>
          )}
        </InputBlock>

        <Checkbox
          id="remember"
          name="rememberMe"
          onChange={formik.handleChange}
          checked={formik.values.rememberMe}
        />
        <CheckboxLabel htmlFor="remember">
          <IoIosCheckmark />
          Lembrar-me
        </CheckboxLabel>

        <SubmitButton type="submit">Entrar no sistema</SubmitButton>
      </Form>

      <LoadingWrapper isLoading={loading}>
        <TeaLoading />
        <strong>Carregando...</strong>
      </LoadingWrapper>
    </Container>
  );
};

export default SignIn;
