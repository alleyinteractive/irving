import React from 'react';
import Loadable from 'react-loadable';

/* eslint-disable */
export default function getAppTemplateVars(templateVars) {
  const { Wrapper } = templateVars;

  /* eslint-disable global-require, import/no-dynamic-require */
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const modules = [];

    return {
      Wrapper: () => (
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <Wrapper />
        </Loadable.Capture>
      ),
      head: {
        script: () => {
          console.log(modules);

          return '';
        }
      }
    };
  }

  return templateVars;
}
