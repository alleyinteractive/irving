const fs = require('fs');
const { clientBuild, rootUrl } = require('../config/paths');
let runtimeSrc;

/**
 * Get the emitted webpack assets as script tags to be rendered by the server.
 * @param {object} clientStats - emitted webpack client bundle info
 * @returns {string[]} - an array of script tags
 */
const getWebpackScripts = (clientStats, flushScripts) => {
  const assets = clientStats.assetsByChunkName;
  // If external sourcemaps are generated each asset will be an array.
  const getAssetPath = (name) => (
    Array.isArray(assets[name]) ? assets[name][0] : assets[name]
  );
  // Verify we're not loading an resource twice using both this
  // function and webpack-flush-chunks.
  const isPrerendered = (assetPath) => (
    Object.values(flushScripts)
      .some((chunkFilename) => chunkFilename === assetPath)
  );
  const scripts = [];

  // Abstracted webpack runtime asset.
  if (assets['runtime~main']) {
    const runtimePublicPath = getAssetPath('runtime~main');

    if (! isPrerendered(runtimePublicPath)) {
      // Memoize file operation for optimal performance.
      if (! runtimeSrc) {
        runtimeSrc = fs.readFileSync(`${clientBuild}/${runtimePublicPath}`);
      }

      // Webpack runtime source should be inlined for optimal performance.
      scripts.push(`<script defer >${runtimeSrc}</script>`);
    }
  }

  // Vendor assets
  if (assets.common) {
    const commonPublicPath = getAssetPath('common');

    if (! isPrerendered(commonPublicPath)) {
      scripts.push(
        `<script defer src="${rootUrl}/${commonPublicPath}"></script>`
      );
    }
  }

  // Main asset
  const mainPublicPath = getAssetPath('main');

  if (! isPrerendered(mainPublicPath)) {
    scripts.push(
      `<script defer src="${rootUrl}/${mainPublicPath}"></script>`
    );
  }

  return scripts;
};

module.exports = getWebpackScripts;
