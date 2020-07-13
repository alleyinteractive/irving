import React from 'react';
import Loadable from 'react-loadable';

export default function getAppTemplateVars(templateVars) {
  const {
    Wrapper: AppWrapper,
  } = templateVars;

  /* eslint-disable global-require, import/no-dynamic-require */
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    // const path = require('path');
    // const { getBundles } = require('react-loadable/webpack');
    // const stats = require(
    //   path.join(process.cwd(), 'build/client/react-loadable.json')
    // );
    const modules = [];

    return {
      Wrapper: () => (
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <AppWrapper />
        </Loadable.Capture>
      ),
      irvingHead: [() => {
        console.log('MODULESSSSSS', modules);
        return '';
      }],
      // ...templateVars,
    };
  }

  return templateVars;
}
