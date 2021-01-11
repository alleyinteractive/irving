/* eslint-disable */
import React from 'react';
import uniq from 'lodash/uniq';

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

    return {
      Wrapper: () => extractor.collectChunks(<Wrapper />),
      head: (head) => ({
        end: () => (
          extractor.getRequiredChunksScriptTag({})
        ),
        // link: () => (
        //   /**
        //    *  @todo find a better way to get rid of the auto-preloading that
        //    *  loadable components seems to enforce
        //    */
        //   extractor.getLinkTags().replace(
        //     /(data-chunk="[^"]+"\srel=)("preload")(\sas="[^"]+")/gi,
        //     '$1"prefetch"'
        //   )
        // ),
        /**
         * Irving Core will indiscriminately load all assets produced by webpack,
         * including chunks for components not used on the page. This function will
         * filter out and load only the chunks required by the page.
         */
        // end: () => {
        //   const mainChunkNames = extractor.getMainAssets('script')
        //     .map((asset) => asset.chunk);
        //   const requiredChunks = uniq(mainChunkNames).join('|');
        //   const requiredChunksTest = new RegExp(
        //     `data-chunk="[^"]*(${requiredChunks})[^"]*"`
        //   );

        //   head.defer = [
        //     ...head.defer.filter((tag) => ( // eslint-disable-line no-param-reassign
        //       requiredChunksTest.test(tag)
        //     )),
        //     ...extractor.getRequiredChunksScriptTag({}),
        //   ];

        //   return extractor.getScriptTags();
        // },
      }),
    };
  }

  return templateVars;
}
