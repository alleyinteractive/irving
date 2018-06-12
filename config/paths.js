const path = require('path');
const os = require('os');

module.exports = {
  clientRoot: path.join(__dirname, '../client'),
  serverRoot: path.join(__dirname, '../server/serverRenderer.js'),
  clientBuild: path.join(__dirname, '../build/client'),
  serverBuild: path.join(__dirname, '../build/server'),
  globalStyles: path.join(__dirname, '../styles'),
  config: __dirname,
  contentBase: path.join(__dirname, '/build'),
  publicPath: '/',
  assetsRoot: path.join(__dirname, '../assets'),
  nodeModules: path.join(__dirname, '../node_modules'),
  postCssConfig: path.join(__dirname, 'postcss.config.js'),
  localCert: path.join(
    os.homedir(),
    'broadway/config/nginx-config/server.crt'
  ),
  localKey: path.join(
    os.homedir(),
    'broadway/config/nginx-config/server.key'
  ),
};
