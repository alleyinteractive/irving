import React from 'react';
import { renderToString } from 'react-dom/server';

export default function getAppTemplateVars(AppWrapper, templateVars) {
  return {
    ...templateVars,
    appHtml: renderToString(<AppWrapper />),
  };
}
