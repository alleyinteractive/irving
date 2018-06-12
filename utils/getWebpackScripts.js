const trimEnd = require('lodash/trimEnd');
const fs = require('fs');
const paths = require('../config/paths');
let { PUBLIC_URL: publicUrl } = process.env;

let runtimeSrc;

/**
 * Get the emitted webpack assets as script elements to be rendered by the server.
 *
 * @param {object} clientStats
 * @returns {string[]}
 */
const getWebpackScripts = (clientStats) => {
  const assets = clientStats.assetsByChunkName;
  const scripts = [];
  publicUrl = trimEnd(publicUrl, '/');

  // Abstracted webpack runtime asset.
  if (assets['runtime~main']) {
    const [runtimePublicPath] = assets['runtime~main'];
    // Memoize file operation for optimal performance.
    if (! runtimeSrc) {
      runtimeSrc = fs.readFileSync(`${paths.appBuild}/${runtimePublicPath}`);
    }

    // Webpack runtime source should be inlined for optimal performance.
    scripts.push(`<script>${runtimeSrc}</script>`);
  }

  // Vendor assets
  if (assets['vendors~main']) {
    const [vendorPublicPath] = assets['vendors~main'];
    scripts.push(`<script src="${publicUrl}/${vendorPublicPath}"></script>`);
  }

  // Main asset
  const [mainPublicPath] = assets.main;
  scripts.push(`<script src="${publicUrl}/${mainPublicPath}"></script>`);

  return scripts;
};

module.exports = getWebpackScripts;
