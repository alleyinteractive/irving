const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const proxy = require('http-proxy-middleware');
const getConfig = require('../config/webpack.config.js');
const getServerConfigField = require('./utils/getServerConfigField');

const config = getConfig({}, { mode: 'development' });
const matchClient = ({ name }) => 'client' === name;
const multiCompiler = webpack(config);
const clientCompiler = multiCompiler.compilers.find(matchClient);
const clientConfig = config.find(matchClient);

const { PROXY_URL } = process.env;

/**
 * Add the required middleware to support running the app in development mode.
 * @param {object} app - express application
 */
const developmentMiddleware = (app) => {
  // Allow customization of development server
  const irvingDevMiddleware = getServerConfigField('customizeDevServer');
  irvingDevMiddleware.forEach((middleware) => middleware(app));

  // Serve webpack handled assets.
  app.use(webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
    logLevel: 'warn', // Info output is overwhelming with bundle information.
  }));
  // Support hot module reloading.
  app.use(webpackHotMiddleware(clientCompiler));
  // Support server executed module hot reloading.
  app.use(webpackHotServerMiddleware(multiCompiler));
  // Support local HTTPS through a proxy.
  if (PROXY_URL) {
    app.use(proxy('**', {
      context: '**',
      target: PROXY_URL,
      changeOrigin: true,
    }));
  }
};

module.exports = developmentMiddleware;
