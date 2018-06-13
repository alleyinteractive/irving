const path = require('path');
const fs = require('fs');
const os = require('os');

const appRoot = fs.realpathSync(process.cwd());
/**
 * Ensure application path is consistent regardless of the processes' current
 * working directory.
 * @param {string} relativePath
 * @returns {string} - absolute path
 */
const resolveDir = (relativePath) => path.resolve(appRoot, relativePath);

module.exports = {
  appRoot,
  clientRoot: resolveDir('client'),
  serverRoot: resolveDir('server/serverRenderer.js'),
  clientBuild: resolveDir('build/client'),
  serverBuild: resolveDir('build/server'),
  globalStyles: resolveDir('styles'),
  rootUrl: process.env.ROOT_URL || 'http://localhost:3001',
  assetsRoot: resolveDir('assets'),
  nodeModules: resolveDir('node_modules'),
  postCssConfig: resolveDir('config/postcss.config.js'),
  localCert: path.join(
    os.homedir(),
    'broadway/config/nginx-config/server.crt'
  ),
  localKey: path.join(
    os.homedir(),
    'broadway/config/nginx-config/server.key'
  ),
};
