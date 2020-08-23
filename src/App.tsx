import React from 'react';
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import ReactModal from 'react-modal';

import { light } from './styles/themes';

import GlobalStyle from './styles/global';

import Routes from './routes';

import history from './services/history';
import { store, persistor } from './store';

ReactModal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={light}>
          <Router history={history}>
            <Routes />
          </Router>

          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
