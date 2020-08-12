import React from 'react';

import {
  Container,
  Logo,
  Form,
  Input,
  InputBlock,
  Label,
  SubmitButton,
} from './styles';

import logo from '../../assets/images/logo.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Logo src={logo} alt="FastFeet" />

      <Form>
        <InputBlock>
          <Label htmlFor="email">Seu e-mail</Label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="exemplo@email.com"
          />
        </InputBlock>

        <InputBlock>
          <Label htmlFor="password">Sua senha</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="*************"
          />
        </InputBlock>

        <SubmitButton type="submit">Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
};

export default SignIn;
