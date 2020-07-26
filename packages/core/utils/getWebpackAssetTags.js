import fs from 'fs';
import { clientBuild, rootUrl } from '../config/paths';
let runtimeSrc;

/**
 * Get the emitted webpack assets as html tags to be rendered by the server.
 *
 * @param {object} clientStats Emitted webpack client bundle info
 * @returns {tags[]} An array of html tags
 */
const getWebpackAssetTags = (clientStats) => {
  const { assetsByChunkName: chunks } = clientStats;
  const tags = [];
  const runtimeJsPath = chunks['runtime~main'];

  // Abstracted webpack runtime asset.
  if (runtimeJsPath) {
    // Memoize file operation for optimal performance.
    if (! runtimeSrc) {
      runtimeSrc = fs.readFileSync(`${clientBuild}/${runtimeJsPath}`);
    }

    // Webpack runtime source should be inlined for optimal performance.
    tags.push(`<script defer>${runtimeSrc}</script>`);
  }

  // Include any other webpack assets that haven't been included yet.
  Object.keys(chunks).forEach((chunkName) => {
    // Runtime main is rendered inline above.
    if ('runtime~main' === chunkName) {
      return;
    }

    const assets = Array.isArray(chunks[chunkName]) ?
      chunks[chunkName] : [chunks[chunkName]];

    assets.forEach((assetPath) => {
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
    });
  });

  return tags.join('');
};

export default getWebpackAssetTags;
