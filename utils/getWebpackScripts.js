const fs = require('fs');
const { clientBuild, rootUrl } = require('../config/paths');
let runtimeSrc;

/**
 * Get the emitted webpack assets as script elements to be rendered by the server.
 * @param {object} clientStats
 * @returns {string[]}
 */
const getWebpackScripts = (clientStats) => {
  const assets = clientStats.assetsByChunkName;
  // If external sourcemaps are generated each asset will be an array.
  const getAssetPath = (name) => (
    Array.isArray(assets[name]) ? assets[name][0] : assets[name]
  );
  const scripts = [];

  // Abstracted webpack runtime asset.
  if (assets['runtime~main']) {
    const runtimePublicPath = getAssetPath('runtime~main');
    // Memoize file operation for optimal performance.
    if (! runtimeSrc) {
      runtimeSrc = fs.readFileSync(`${clientBuild}/${runtimePublicPath}`);
    }

    // Webpack runtime source should be inlined for optimal performance.
    scripts.push(`<script>${runtimeSrc}</script>`);
  }

  // Vendor assets
  if (assets.common) {
    const commonPublicPath = getAssetPath('common');
    scripts.push(`<script src="${rootUrl}/${commonPublicPath}"></script>`);
  }

  // Main asset
  const mainPublicPath = getAssetPath('main');
  scripts.push(`<script src="${rootUrl}/${mainPublicPath}"></script>`);

  return scripts;
};

module.exports = getWebpackScripts;
