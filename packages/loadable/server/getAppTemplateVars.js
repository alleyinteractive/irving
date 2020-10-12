import React from 'react';

/* eslint-disable global-require, import/no-dynamic-require */
export default function getAppTemplateVars(templateVars, clientStats) {
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const { Wrapper } = templateVars;
    const { ChunkExtractor } = require('@loadable/server');
    const extractor = new ChunkExtractor({ stats: clientStats });

    return {
      Wrapper: () => extractor.collectChunks(<Wrapper />),
      head: {
        script: () => extractor.getScriptTags(),
        link: () => extractor.getLinkTags(),
        style: () => extractor.getStyleTags(),
      },
    };
  }

  return templateVars;
}
