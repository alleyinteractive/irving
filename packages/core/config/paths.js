const path = require('path');
const fs = require('fs');

const appRoot = fs.realpathSync(process.cwd());
const irvingRoot = fs.realpathSync(
  path.join(__dirname, '../')
);

/**
 * Ensure irving paths are consistent regardless of the processes' current
 * working directory.
 *
 * @param {string} relativePath
 * @returns {string} - absolute path
 */
const resolveIrvingDir = (relativePath) => (
  path.resolve(irvingRoot, relativePath)
);

/**
 * Ensure application paths are consistent regardless of the processes' current
 * working directory.
 * @param {string} relativePath
 * @returns {string} - absolute path
 */
const resolveAppDir = (relativePath) => path.resolve(appRoot, relativePath);

const {
  PROXY_URL,
  ROOT_URL,
  NODE_ENV,
} = process.env;

module.exports = {
  appRoot,
  irvingRoot,
  clientRoot: resolveIrvingDir('client'),
  serverRoot: resolveIrvingDir('server/serverRenderer.js'),
  clientBuild: resolveAppDir('build/client'),
  serverBuild: resolveAppDir('build/server'),
  userConfig: resolveAppDir('irving.config.js'),
  serverConfig: 'test' === NODE_ENV ?
    resolveIrvingDir('test/irving-test.config.js') :
    resolveAppDir('irving.config.server.js'),
  globalStyles: resolveIrvingDir('assets/styles'),
  rootUrl: ROOT_URL || 'http://localhost:3001',
  proxyUrl: PROXY_URL,
  assetsRoot: resolveIrvingDir('assets'),
  nodeModules: resolveIrvingDir('node_modules'),
  postCssConfig: resolveIrvingDir('config/postcss.config.js'),
  styleguideRoot: resolveIrvingDir('styleguide'),
  transform: require.resolve('critical-style-loader/lib/filterCriticalCss.js'),
};
