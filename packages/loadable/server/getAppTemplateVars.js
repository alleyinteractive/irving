import React from 'react';

/* eslint-disable global-require, import/no-dynamic-require */
export default function getAppTemplateVars(templateVars) {
  if (
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const path = require('path');
    const { clientBuild } = require('@irvingjs/core/config/paths');
    const statsFile = path.resolve(clientBuild, './loadable-stats.json');
    const { Wrapper } = templateVars;
    const { ChunkExtractor } = require('@loadable/server');
    const extractor = new ChunkExtractor({ statsFile });
    const filterCoreTags = require('./filterCoreTags');
    const filterAndMerge = (tags) => (
      filterCoreTags(tags.split('\n')).join('\n')
    );

    return {
      Wrapper: () => extractor.collectChunks(<Wrapper />),
      head: {
        end: () => (
          filterAndMerge(extractor.getScriptTags())
        ),
        link: () => {
          const links = filterAndMerge(extractor.getLinkTags());
          /**
           *  @todo find a better way to get rid of the auto-preloading that
           *  loadable components seems to enforce
           */
          return links.replace(
            /(data-chunk="[^"]+"\srel=)("preload")(\sas="[^"]+")/gi,
            '$1"prefetch"'
          );
        },
        style: () => (
          filterAndMerge(extractor.getStyleTags())
        ),
      },
    };
  }

  return templateVars;
}
