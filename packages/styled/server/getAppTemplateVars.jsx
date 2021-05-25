import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default function getAppTemplateVars(templateVars) {
  const { Wrapper } = templateVars;
  const sheet = new ServerStyleSheet();

  return {
    Wrapper: () => sheet.collectStyles(<Wrapper />),
    head: {
      end: () => {
        const styles = sheet.getStyleTags();
        sheet.seal();
        return styles;
      },
    },
  };
}
