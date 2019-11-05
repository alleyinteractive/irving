const path = require('path');
const fs = require('fs');

// Support isomorphic environment variables from local .env file
require('dotenv').config();
const {
  PROXY_URL,
  ROOT_URL,
  NODE_ENV,
  APP_ROOT,
  BUILD_CONTEXT,
} = process.env;

// Root of user app and root of irving core.
const appRoot = APP_ROOT || fs.realpathSync(process.cwd());
const irvingRoot = fs.realpathSync(
  path.join(__dirname, '../')
);

// Used for webpack `context` config value. Useful to configure if app is built in a
// different location from where it is run.
const buildContext = BUILD_CONTEXT || fs.realpathSync(process.cwd());

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

module.exports = {
  appRoot,
  irvingRoot,
  buildContext,
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
