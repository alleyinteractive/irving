import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
const fs = require('fs');
const { clientBuild, rootUrl } = require('../config/paths');
let runtimeSrc;

/**
 * Get the emitted webpack assets as script tags to be rendered by the server.
 * @param {object} clientStats - emitted webpack client bundle info
 * @returns {string[]} - an array of script tags
 */
const getWebpackScripts = (clientStats) => {
  const {
    js: asyncChunks,
    scripts: flushScripts,
  } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['common'],
    after: ['main'],
  });
  const { assets } = clientStats;
  // Verify we're not loading an resource twice using both this
  // function and webpack-flush-chunks.
  const isPrerendered = (assetPath) => (
    Object.values(flushScripts)
      .some((chunkFilename) => chunkFilename === assetPath)
  );
  const scripts = [];
  const runtime = assets.find(
    (asset) => asset.name.includes('runtime~main')
  );

  // Abstracted webpack runtime asset.
  if (runtime) {
    const { name } = runtime;

    if (! isPrerendered(name)) {
      // Memoize file operation for optimal performance.
      if (! runtimeSrc) {
        runtimeSrc = fs.readFileSync(`${clientBuild}/${name}`);
      }

      // Webpack runtime source should be inlined for optimal performance.
      scripts.push(`<script defer >${runtimeSrc}</script>`);
    }
  }

  // Prioritize flushed chunks.
  scripts.push(asyncChunks);

  // Include any other webpack assets that haven't been included yet.
  assets.forEach((asset) => {
    const { name } = asset;

    // Runtime main is rendered inline above.
    if ('runtime~main' === name) {
      return;
    }

    if (! isPrerendered(name)) {
      if (name.match(/\.js$/)) {
        scripts.push(
          `<script defer src="${rootUrl}/${name}"></script>`
        );
      }

      if (name.match(/\.css$/)) {
        scripts.push(
          `<link rel="stylesheet" href="${rootUrl}/${name}"></link>`
        );
      }
    }
  });

  return scripts;
};

export default getWebpackScripts;
