import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default function getAppTemplateVars(templateVars) {
  const sheet = new ServerStyleSheet();
  const { Wrapper } = templateVars;

  return {
    Wrapper: () => sheet.collectStyles(<Wrapper />),
    head: {
      end: () => sheet.getStyleTags(),
    },
  };
}
