const path = require('path');
const fs = require('fs');

// Support isomorphic environment variables from local .env file
require('dotenv').config();

const {
  PROXY_URL,
  ROOT_URL,
  BUILD_CONTEXT,
} = process.env;

// Used for webpack `context` config value. Useful to configure if app is built in a
// different location from where it is run.
const buildContext = BUILD_CONTEXT || fs.realpathSync(process.cwd());

// Root of user app and root of irving core.
const appRoot = fs.realpathSync(process.cwd());
const irvingRoot = path.join(buildContext, 'node_modules/@irvingjs/core');

// Path to irving core relative to the appRoot.
const appIrvingRoot = path.join(
  appRoot,
  path.relative(buildContext, irvingRoot),
);

/**
 * Ensure irving paths are consistent regardless of the processes' current
 * working directory.
 *
 * @param {string} relativePath Path relative to irving core.
 * @returns {string} Absolute path
 */
const resolveIrvingDir = (relativePath) => (
  path.resolve(irvingRoot, relativePath)
);

/**
 * Ensure application paths are consistent regardless of the processes' current
 * working directory.
 *
 * @param {string} relativePath Path relative to the user app.
 * @returns {string} Absolute path
 */
const resolveAppDir = (relativePath) => path.resolve(appRoot, relativePath);

/**
 * Ensure build paths are consistent.
 *
 * @param {string} relativePath Path relative to the build context.
 * @returns {string} Absolute path
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
  config: resolveAppDir('irving.config.js'),
  globalStyles: resolveIrvingDir('assets/styles'),
  irvingRoot,
  localRoot: path.join(__dirname, '../../../'),
  mocks: resolveIrvingDir('__mocks__'),
  nodeModules: resolveIrvingDir('node_modules'),
  postCssConfig: resolveIrvingDir('config/postcss.config.js'),
  proxyUrl: PROXY_URL,
  rootUrl: ROOT_URL || '',
  serverBuild: resolveBuildDir('build/server'),
  serverRoot: resolveIrvingDir('server/serverRenderer'),
};
