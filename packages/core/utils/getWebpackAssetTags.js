import fs from 'fs';
import { getValueFromConfig } from 'config/irving/getValueFromConfig';
import { clientBuild } from 'config/paths';
import getEnv from 'config/irving/getEnv';

let runtimeSrc;

/**
 * Get the emitted webpack assets as html tags to be rendered by the server.
 *
 * @param {object} clientStats Emitted webpack client bundle info
 * @param {string} hostname Hostname for current site
 * @returns {tags[]} An array of html tags
 */
const getWebpackAssetTags = (clientStats, hostname) => {
  const { assetsByChunkName: chunks } = clientStats;
  const tags = [];
  const runtimeJsPath = chunks['runtime~main'];
  const { ROOT_URL } = getEnv(hostname);

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
      /* eslint-disable max-len */
      if (assetPath.match(/\.js$/)) {
        tags.push(
          `<script defer src="${ROOT_URL}/${assetPath}"></script>`
        );
      }

      if (assetPath.match(/\.css$/)) {
        tags.push(
          `<link rel="stylesheet" href="${ROOT_URL}/${assetPath}"></link>`
        );
      }
      /* eslint-enable */
    });
  });

  return getValueFromConfig('ssrTags', tags).join('');
};

export default getWebpackAssetTags;
