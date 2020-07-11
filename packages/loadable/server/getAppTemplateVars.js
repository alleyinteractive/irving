import React from 'react';
import Loadable from 'react-loadable';

export default function getAppTemplateVars(templateVars) {
  const {
    Wrapper: AppWrapper,
  } = templateVars;
  const modules = [];

  return {
    Wrapper: () => (
      <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
        <AppWrapper />
      </Loadable.Capture>
    ),
    ...templateVars,
  };
}
