import React from 'react';
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';

import GlobalStyle from './styles/global';

import Routes from './routes';

import history from './services/history';
import { store } from './store';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={light}>
        <Router history={history}>
          <Routes />
        </Router>

        <GlobalStyle />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
