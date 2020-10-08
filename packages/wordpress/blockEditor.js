import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import BlockStyles from './components/blockStyles';

const irving = window.irving || {
  siteTheme: {},
};

const BlockStylesRoot = () => (
  <ThemeProvider theme={irving.siteTheme}>
    <BlockStyles />
  </ThemeProvider>
);

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<BlockStylesRoot />, root);
