import React from 'react';

/* eslint-disable global-require, import/no-dynamic-require */
export default function getAppTemplateVars(templateVars, clientStats) {
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    // const path = require('path');
    // const { clientBuild } = require('@irvingjs/core/config/paths');
    // const statsFile = path.resolve(clientBuild, './loadable-stats.json');
    const { Wrapper } = templateVars;
    const { ChunkExtractor } = require('@loadable/server');
    const extractor = new ChunkExtractor({ stats: clientStats });

    return {
      Wrapper: () => extractor.collectChunks(<Wrapper />),
      head: {
        script: () => extractor.getScriptTags(),
        link: () => (
          /**
           *  @todo find a better way to get rid of the auto-preloading that
           *  loadable components seems to enforce
           */
          extractor.getLinkTags().replace(
            /(data-chunk="[^"]+"\srel=)("preload")(\sas="[^"]+")/gi,
            '$1"prefetch"'
          )
        ),
        style: () => extractor.getStyleTags(),
      },
    };
  }

  return templateVars;
}
