import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import BlockStyles from './components/blockStyles';

const BlockStylesRoot = () => (
  <ThemeProvider theme={window.irving.siteTheme}>
    <BlockStyles />
  </ThemeProvider>
);

const root = document.getElemenById('block-styles-root');

ReactDOM.render(<BlockStylesRoot />, root);
