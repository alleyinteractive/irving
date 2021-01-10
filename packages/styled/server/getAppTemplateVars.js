import React from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function getAppTemplateVars(templateVars) {
  const { Wrapper } = templateVars;
  const sheet = new ServerStyleSheet();

  return {
    Wrapper: () => sheet.collectStyles(
      <StyleSheetManager disableCSSOMInjection>
        <Wrapper />
      </StyleSheetManager>
    ),
    head: {
      end: () => {
        const styles = sheet.getStyleTags();
        sheet.seal();
        return styles;
      },
    },
  };
}
