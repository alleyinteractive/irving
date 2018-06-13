const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const makeConfig = require('../config/webpack.config.js');
const config = makeConfig({}, { mode: 'development' });
const matchClient = ({ name }) => 'client' === name;
const multiCompiler = webpack(config);
const clientCompiler = multiCompiler.compilers.find(matchClient);
const clientConfig = config.find(matchClient);

/**
 * Add the required middleware to support running the app in development mode.
 * @param {object} app - express application
 */
const developmentMiddleware = (app) => {
  app.use(webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
  }));

  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler));
};

module.exports = developmentMiddleware;
