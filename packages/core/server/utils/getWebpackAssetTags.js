import fs from 'fs';
import { getValueFromConfigNoMemo } from 'config/irving/getValueFromConfig';
import { clientBuild } from 'config/paths';
import { getEnv } from 'config/irving/multisite';

let runtimeSrc;

/**
 * Generate appropriate HTML tags for an array of chunk assets.
 *
 * @param {array} assets Array of webpack assets for a specific chunk
 * @param {string} rootUrl Configured Root URL for this environment or site.
 * @returns {tags[]} An array of html tags
 */
export const createAssetTags = (assets, rootUrl) => {
  const normalizedAssets = Array.isArray(assets) ? assets : [assets];
  const tags = [];

  normalizedAssets.forEach((assetPath) => {
    /* eslint-disable max-len */
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
    /* eslint-enable */
  });

  return tags;
};

/**
 * Get the emitted webpack assets as html tags to be rendered by the server.
 *
 * @param {object} clientStats Emitted webpack client bundle info
 * @param {string} hostname Hostname for current site
 * @returns {tags} An string of html tags
 */
const getWebpackAssetTags = (clientStats, hostname) => {
  const { assetsByChunkName: chunks } = clientStats;
  const runtimeJsPath = chunks['runtime~main'] || chunks.runtime;
  const { ROOT_URL } = getEnv(hostname);
  let tags = [];

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
  tags = Object.keys(chunks).reduce((acc, chunkName) => {
    // Runtime main is rendered inline above.
    if (
      'runtime~main' === chunkName ||
      'runtime' === chunkName
    ) {
      return acc;
    }

    return acc.concat(createAssetTags(chunks[chunkName], ROOT_URL));
  }, tags);

  return getValueFromConfigNoMemo('ssrTags', tags).join('');
};

export default getWebpackAssetTags;
