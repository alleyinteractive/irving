import React from 'react';

export default function getErrorTemplateVars(ErrorWrapper, templateVars) {
  return {
    ...templateVars,
    appHtml: () => <ErrorWrapper />,
  };
}
