import fs from 'fs';
import { getValueFromConfigNoMemo } from 'config/irving/getValueFromConfig';
import { clientBuild } from 'config/paths';
import getEnv from 'config/irving/getEnv';

let runtimeSrc;

export const coreChunks = [
  'runtime',
  'main',
  'common',
];

/**
 * Get the emitted webpack assets as html tags to be rendered by the server.
 *
 * @param {object} clientStats Emitted webpack client bundle info
 * @param {string} hostname Hostname for current site
 * @returns {tags[]} An array of html tags
 */
/* eslint-disable max-len */
const getWebpackAssetTags = (clientStats, hostname) => {
  const { assetsByChunkName: chunks } = clientStats;
  const tags = [];
  const { ROOT_URL } = getEnv(hostname);
  const normalizeChunkAssets = (chunkName) => (
    Array.isArray(chunks[chunkName]) ?
      chunks[chunkName] : [chunks[chunkName]]
  );
  const coreAssets = coreChunks.map(normalizeChunkAssets);
  const otherAssets = Object.keys(chunks)
    .filter((chunkName) => (
      ! coreChunks.includes(chunkName)
    )).map(normalizeChunkAssets);
  const outputChunkAssets = (assets) => (
    assets.forEach((assetPath) => {
      if (
        ! assetPath ||
        assetPath.includes('runtime')
      ) {
        return;
      }

      switch (true) {
        case (assetPath.match(/\.main\.bundle\.js$/)):
          tags.push(
            `<script async module src="${ROOT_URL}/${assetPath}"></script>`
          );
          break;

        case (assetPath.match(/\.main\.es5\.bundle\.js$/)):
          tags.push(
            `<script async nomodule src="${ROOT_URL}/${assetPath}"></script>`
          );
          break;

        case (assetPath.match(/\.js$/)):
          tags.push(
            `<script async src="${ROOT_URL}/${assetPath}"></script>`
          );
          break;

        case (assetPath.match(/\.css$/)):
          tags.push(
            `<link rel="stylesheet" href="${ROOT_URL}/${assetPath}"></link>`
          );
          break;

        default:
          break;
      }
    })
  );

  // Abstracted webpack runtime asset.
  const runtimeJsPath = chunks.runtime;
  if (runtimeJsPath) {
    // Memoize file operation for optimal performance.
    if (! runtimeSrc) {
      runtimeSrc = fs.readFileSync(
        `${clientBuild}/${runtimeJsPath}`,
        'utf8'
      );
    }

    // Webpack runtime source should be inlined for optimal performance.
    tags.push(`<script data-path="${runtimeJsPath}" id="irving-webpack-runtime" defer>${runtimeSrc}</script>`);
  }

  // Map over and render core assets first.
  coreAssets.forEach(outputChunkAssets);

  // Render any additional assets.
  otherAssets.forEach(outputChunkAssets);

  return getValueFromConfigNoMemo('ssrTags', tags).join('');
};
/* eslint-enable */

export default getWebpackAssetTags;
