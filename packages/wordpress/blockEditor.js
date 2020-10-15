import React from 'react';
import ReactDOM from 'react-dom';
import SiteThemeProvider from
  '@irvingjs/styled/components/siteThemeProvider';
import BlockStyles from './components/blockStyles';

const BlockStylesRoot = () => (
  <SiteThemeProvider theme={window.irvingSiteTheme || {}}>
    <BlockStyles />
  </SiteThemeProvider>
);

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<BlockStylesRoot />, root);
