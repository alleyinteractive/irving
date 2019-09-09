import React from 'react';
import { renderToString } from 'react-dom/server';

export default function getErrorTemplateVars(ErrorWrapper, templateVars) {
  return {
    ...templateVars,
    appHtml: renderToString(<ErrorWrapper />),
  };
}
