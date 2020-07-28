import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default function getAppTemplateVars(templateVars) {
  const sheet = new ServerStyleSheet();
  const {
    Wrapper: AppWrapper,
  } = templateVars;

  return {
    Wrapper: () => sheet.collectStyles(
      <AppWrapper />
    ),
    head: {
      end: [() => sheet.getStyleTags()],
    },
  };
}
