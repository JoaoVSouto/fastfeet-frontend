import React from 'react';
import { ThemeProvider } from 'styled-components';

import light from './styles/themes/light';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <h1>hello world</h1>

      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
