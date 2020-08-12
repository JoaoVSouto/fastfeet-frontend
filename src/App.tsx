import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';

import GlobalStyle from './styles/global';

import Routes from './routes';

import history from './services/history';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <Router history={history}>
        <Routes />
      </Router>

      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
