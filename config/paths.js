const path = require('path');
const fs = require('fs');

const appRoot = fs.realpathSync(process.cwd());
/**
 * Ensure application path is consistent regardless of the processes' current
 * working directory.
 * @param {string} relativePath
 * @returns {string} - absolute path
 */
const resolveDir = (relativePath) => path.resolve(appRoot, relativePath);

const { PROXY_URL, ROOT_URL } = process.env;

module.exports = {
  appRoot,
  clientRoot: resolveDir('client'),
  serverRoot: resolveDir('server/serverRenderer.js'),
  clientBuild: resolveDir('build/client'),
  serverBuild: resolveDir('build/server'),
  globalStyles: resolveDir('assets/styles'),
  rootUrl: PROXY_URL || ROOT_URL || 'http://localhost:3001',
  assetsRoot: resolveDir('assets'),
  nodeModules: resolveDir('node_modules'),
  postCssConfig: resolveDir('config/postcss.config.js'),
  styleguideRoot: resolveDir('styleguide'),
  transform: 'node_modules/critical-style-loader/lib/filterCriticalCss.js',
};
