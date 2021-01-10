import fs from 'fs';
import { clientBuild } from 'config/paths';
import getEnv from 'config/irving/getEnv';
import getLogService from '@irvingjs/services/logService';

const log = getLogService('irving:server:assets');
let runtimeSrc;

/**
 * Get the emitted webpack assets as html tags to be rendered by the server.
 *
 * @param {object} clientStats Emitted webpack client bundle info
 * @param {string} hostname Hostname for current site
 * @returns {tags[]} An array of html tags
 */
/* eslint-disable */
const getWebpackAssetTags = (clientStats, hostname) => {
  const [
    { assetsByChunkName: modernChunks },
    { assetsByChunkName: es5Chunks },
  ] = clientStats;
  const script = [];
  const style = [];
  const loaded = [];
  const { ROOT_URL } = getEnv(hostname);

  log.info('%o', modernChunks);
  log.info('%o', es5Chunks);

  const addChunkAssets = (chunks) => (
    Object.keys(chunks).forEach((chunkName) => {
      // Some times there's disagreement on the chunk common is a part of,
      // so we just indicate it's part of the main chunk here.
      const dataChunkName = 'common' === chunkName ?
        'main' : chunkName;
      const assets = Array.isArray(chunks[chunkName]) ?
        chunks[chunkName] : [chunks[chunkName]]

      assets.forEach((assetPath) => {
        if (
          ! assetPath ||
          assetPath.includes('runtime') ||
          loaded.includes(assetPath)
        ) {
          return;
        }

        // Add to an array indicating we've already attempted to load this asset.
        loaded.push(assetPath);

        switch (true) {
          case /\.es5\.(bundle|chunk)\.js$/.test(assetPath):
            script.push(
              `<script async nomodule data-chunk="${dataChunkName}" src="${ROOT_URL}/${assetPath}"></script>`
            );
            break;

          case /\.(bundle|chunk)\.js$/.test(assetPath):
            script.push(
              `<script async type="module" data-chunk="${dataChunkName}" src="${ROOT_URL}/${assetPath}"></script>`
            );
            break;

          case /\.css$/.test(assetPath):
            style.push(
              `<link rel="stylesheet" href="${ROOT_URL}/${assetPath}" />`
            );
            break;

          default:
            break;
        }
      });
    })
  );

  // Abstracted webpack runtime asset.
  const runtimeJsPath = modernChunks.runtime;
  if (
    runtimeJsPath &&
    ! 'development' == process.env.IRVING_EXECUTION_CONTEXT
    ) {
    // Memoize file operation for optimal performance.
    if (! runtimeSrc) {
      runtimeSrc = fs.readFileSync(
        `${clientBuild}/${runtimeJsPath}`,
        'utf8'
      );
    }

    // Webpack runtime source should be inlined for optimal performance.
    script.push(`<script data-path="${runtimeJsPath}" id="irving-webpack-runtime">${runtimeSrc}</script>`);
  }

  // Map over and render core assets first.
  addChunkAssets(modernChunks);

  // Render any additional assets.
  addChunkAssets(es5Chunks);

  return {
    script,
    style,
  };
};
/* eslint-enable */

export default getWebpackAssetTags;
