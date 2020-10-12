import React from 'react';

/* eslint-disable */
export default function getAppTemplateVars(templateVars, clientStats) {
  const { Wrapper } = templateVars;

  /* eslint-disable global-require, import/no-dynamic-require */
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const { ChunkExtractor } = require('@loadable/server');
    const extractor = new ChunkExtractor({ stats: clientStats });

    return {
      Wrapper: () => extractor.collectChunks(<Wrapper />),
      head: {
        script: [() => extractor.getScriptTags()],
        link: [() => extractor.getLinkTags()],
        style: [() => extractor.getStyleTags()],
      },
    };
  }

  return templateVars;
}
