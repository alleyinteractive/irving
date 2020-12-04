import React from 'react';
import ReactDOM from 'react-dom';
import styled, * as styledStuff from 'styled-components';
import SiteThemeProvider from '@irvingjs/styled/components/siteThemeProvider';
import BlockStyles from './components/blockStyles';

const BlockStylesRoot = () => (
  <SiteThemeProvider theme={window.irvingSiteTheme || {}}>
    <BlockStyles />
  </SiteThemeProvider>
);

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<BlockStylesRoot />, root);

/**
 * Export styled components instance, which will be assigned to
 * window.irvingEditor.styledComponents, allowing other editor or block
 * bundles to use the same instance of styled components as a webpack external.
 */
export const styledComponents = {
  ...styled,
  ...styledStuff,
};
