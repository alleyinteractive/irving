import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default function getAppTemplateVars(templateVars) {
  const sheet = new ServerStyleSheet();
  const {
    irvingHead,
    Wrapper: AppWrapper,
  } = templateVars;

  return {
    Wrapper: () => sheet.collectStyles(
      <AppWrapper />
    ),
    irvingHead: [() => `${irvingHead}${sheet.getStyleTags()}`],
  };
}
