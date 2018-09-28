/* eslint-disable */

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const getConfig = require('../config/webpack.config.js');

const config = getConfig({}, { mode: 'development' });
const matchClient = ({ name }) => 'client' === name;
const multiCompiler = webpack(config);
const clientCompiler = multiCompiler.compilers.find(matchClient);
const clientConfig = config.find(matchClient);

const HTTPS = true;
const { PORT } = process.env;

/**
 * Add the required middleware to support running the app in development mode.
 * @param {object} app - express application
 */
const developmentMiddleware = (app) => {
  const devMiddlewareInstance = webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
    logLevel: 'warn', // Info output is overwhelming with bundle information.
  });
  app.use(devMiddlewareInstance);
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler));

  // // Begin compiling the bundle immediately.
  // devMiddlewareInstance.invalidate();
  // console.log('compiling initial bundle...'); // eslint-disable-line no-console
};

module.exports = developmentMiddleware;
