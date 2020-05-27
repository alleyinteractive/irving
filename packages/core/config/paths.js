const path = require('path');
const fs = require('fs');

// Support isomorphic environment variables from local .env file
require('dotenv').config();
const {
  PROXY_URL,
  ROOT_URL,
  APP_ROOT,
  BUILD_CONTEXT,
} = process.env;

// Used for webpack `context` config value. Useful to configure if app is built in a
// different location from where it is run.
const buildContext = BUILD_CONTEXT || fs.realpathSync(process.cwd());

// Root of user app and root of irving core.
const appRoot = APP_ROOT || fs.realpathSync(process.cwd());
const irvingRoot = path.join(__dirname, '../');

// Path to irving core relative to the appRoot.
const appIrvingRoot = path.join(
  appRoot,
  path.relative(buildContext, irvingRoot)
);

/**
 * Ensure irving paths are consistent regardless of the processes' current
 * working directory.
 *
 * @param {string} relativePath Path relative to irving core.
 * @returns {string} - absolute path
 */
const resolveIrvingDir = (relativePath) => (
  path.resolve(irvingRoot, relativePath)
);

/**
 * Ensure application paths are consistent regardless of the processes' current
 * working directory.
 *
 * @param {string} relativePath Path relative to the user app.
 * @returns {string} - absolute path
 */
const resolveAppDir = (relativePath) => path.resolve(appRoot, relativePath);

/**
 * Ensure build paths are consistent.
 *
 * @param {string} relativePath Path relative to the build context.
 * @returns {string} - absolute path
 */
const resolveBuildDir = (relativePath) => (
  path.resolve(buildContext, relativePath)
);

module.exports = {
  appRoot,
  appIrvingRoot,
  assetsRoot: resolveIrvingDir('assets'),
  buildContext,
  clientBuild: resolveBuildDir('build/client'),
  clientRoot: resolveIrvingDir('client'),
  config: resolveBuildDir('irving.config.js'),
  globalStyles: resolveIrvingDir('assets/styles'),
  irvingRoot,
  mocks: resolveIrvingDir('__mocks__'),
  nodeModules: resolveIrvingDir('node_modules'),
  postCssConfig: resolveIrvingDir('config/postcss.config.js'),
  proxyUrl: PROXY_URL,
  rootUrl: ROOT_URL || 'http://localhost:3001',
  serverBuild: resolveBuildDir('build/server'),
  serverRoot: resolveIrvingDir('server'),
  transform: require.resolve('critical-style-loader/lib/filterCriticalCss.js'),
  userConfig: resolveAppDir('irving.config.js'),
};
