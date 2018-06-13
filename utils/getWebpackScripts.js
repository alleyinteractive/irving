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
  const scripts = [];

  // Abstracted webpack runtime asset.
  if (assets['runtime~main']) {
    const [runtimePublicPath] = assets['runtime~main'];
    // Memoize file operation for optimal performance.
    if (! runtimeSrc) {
      runtimeSrc = fs.readFileSync(`${clientBuild}/${runtimePublicPath}`);
    }

    // Webpack runtime source should be inlined for optimal performance.
    scripts.push(`<script>${runtimeSrc}</script>`);
  }

  // Vendor assets
  if (assets.common) {
    const [vendorPublicPath] = assets.common;
    scripts.push(`<script src="${rootUrl}/${vendorPublicPath}"></script>`);
  }

  // Main asset
  const [mainPublicPath] = assets.main;
  scripts.push(`<script src="${rootUrl}/${mainPublicPath}"></script>`);

  return scripts;
};

module.exports = getWebpackScripts;
