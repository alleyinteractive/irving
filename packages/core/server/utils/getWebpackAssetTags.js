/* eslint-disable */
import fs from 'fs';
import { clientBuild } from 'config/paths';
import getEnv from 'config/irving/getEnv';
import getLogService from '@irvingjs/services/logService';
import pick from 'lodash/pick';

const log = getLogService('irving:server:assets');
let runtimeSrc;
let es5RuntimeSrc;

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
    { assetsByChunkName: moduleChunks },
    { assetsByChunkName: es5Chunks },
  ] = clientStats;
  const defer = [];
  const style = [];
  const loaded = [];
  const { ROOT_URL } = getEnv(hostname);

  log.info('%o', moduleChunks);
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
            defer.push(
              `<script async data-chunk="${dataChunkName}" src="${ROOT_URL}/${assetPath}"></script>`
            );
            break;

          case /\.(bundle|chunk)\.js$/.test(assetPath):
            defer.push(
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

  // Inline and memoize runtime for optimal performance.
  if ('development_server' !== process.env.IRVING_EXECUTION_CONTEXT) {
    // Modern runtime.
    // const runtimeJsPath = moduleChunks.runtime;
    // if (! runtimeSrc && runtimeJsPath) {
    //   runtimeSrc = fs.readFileSync(`${clientBuild}/${runtimeJsPath}`, 'utf8');
    // }

    // defer.push(`<script data-chunk="main" data-path="${runtimeJsPath}" id="irving-webpack-runtime">${runtimeSrc}</script>`);

    // Es5 runtime.
    // const es5RuntimeJsPath = es5Chunks.runtime;
    // if (! es5RuntimeSrc && es5RuntimeJsPath) {
    //   runtimeSrc = fs.readFileSync(`${clientBuild}/${es5RuntimeJsPath}`, 'utf8');
    // }

    // script.push(`<script nomodule data-chunk="main" data-path="${runtimeJsPath}" id="irving-webpack-es5-runtime">${runtimeSrc}</script>`);
  }

  // Map over and render core assets first.
  // addChunkAssets(moduleChunks);

  // Render any additional assets.
  addChunkAssets({
    main: es5Chunks.main,
  });

  return {
    defer,
    style,
  };
};
/* eslint-enable */

export default getWebpackAssetTags;
