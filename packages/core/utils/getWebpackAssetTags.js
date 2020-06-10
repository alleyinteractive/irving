import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
const fs = require('fs');
const { clientBuild, rootUrl } = require('../config/paths');
let runtimeSrc;

/**
 * Get the emitted webpack assets as html tags to be rendered by the server.
 *
 * @param {object} clientStats - emitted webpack client bundle info
 * @returns {tags[]} - an array of html tags
 */
const getWebpackAssetTags = (clientStats) => {
  const {
    js: asyncChunks,
    scripts: flushScripts,
  } = flushChunks(clientStats, {
    chunkNames: flushChunkNames(),
    before: ['common'],
    after: ['main'],
  });
  const { assetsByChunkName: chunks } = clientStats;
  // Verify we're not loading an resource twice using both this
  // function and webpack-flush-chunks.
  const isPrerendered = (assetPath) => (
    Object.values(flushScripts)
      .some((chunkFilename) => chunkFilename === assetPath)
  );
  const tags = [];
  const runtime = chunks['runtime~main'];

  // Abstracted webpack runtime asset.
  if (runtime) {
    if (! isPrerendered('runtime~main')) {
      // Memoize file operation for optimal performance.
      if (! runtimeSrc) {
        const runtimeJsPath = runtime.find((asset) => asset.includes('.js'));
        runtimeSrc = fs.readFileSync(`${clientBuild}/${runtimeJsPath}`);
      }

      // Webpack runtime source should be inlined for optimal performance.
      tags.push(`<script defer>${runtimeSrc}</script>`);
    }
  }

  // Prioritize flushed chunks.
  tags.push(asyncChunks);

  // Include any other webpack assets that haven't been included yet.
  Object.keys(chunks).forEach((chunkName) => {
    // Runtime main is rendered inline above.
    if ('runtime~main' === chunkName) {
      return;
    }

    const assets = Array.isArray(chunks[chunkName]) ?
      chunks[chunkName] : [chunks[chunkName]];

    assets.forEach((assetPath) => {
      if (! isPrerendered(assetPath)) {
        if (assetPath.match(/\.js$/)) {
          tags.push(
            `<script defer src="${rootUrl}/${assetPath}"></script>`
          );
        }

        if (assetPath.match(/\.css$/)) {
          tags.push(
            `<link rel="stylesheet" href="${rootUrl}/${assetPath}"></link>`
          );
        }
      }
    });
  });

  return tags;
};

export default getWebpackAssetTags;
