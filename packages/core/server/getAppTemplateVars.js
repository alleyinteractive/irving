import React from 'react';

export default function getAppTemplateVars(AppWrapper, templateVars) {
  return {
    ...templateVars,
    appHtml: () => <AppWrapper />,
  };
}
