import React from 'react';

import Header from '../../../components/Header';

import { Container } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default DefaultLayout;
