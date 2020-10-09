import React from 'react';
import Loadable from 'react-loadable';

/* eslint-disable */
export default function getAppTemplateVars(templateVars, clientStats) {
  const { Wrapper } = templateVars;
  const { chunks } = clientStats;

  /* eslint-disable global-require, import/no-dynamic-require */
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const { rootUrl } = require('@irvingjs/core/config/paths');
    const ssrModules = [];

    return {
      Wrapper: () => {
        return (
          <Loadable.Capture
            report={(moduleName) => ssrModules.push(moduleName)}
          >
            <Wrapper />
          </Loadable.Capture>
        );
      },
      head: {
        script: [() => {
          const loadableChunks = chunks.filter((chunk) => {
            if (chunk.parents.length) {
              return chunk.modules
                .map(({ id }) => id)
                .some((moduleId) => (
                  ssrModules.some((modulePath) => moduleId.includes(modulePath))
                ));
            }

            return false;
          });

          return loadableChunks.map((chunk) => (
            chunk.files.map((filename) => (
              `<script defer src="${rootUrl}/${filename}"></script>`
            )).join('')
          )).join('');
        }]
      },
    };
  }

  return templateVars;
}
