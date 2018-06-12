const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const makeConfig = require('../config/webpack.config.js');
const config = makeConfig({}, { argv: { mode: 'development' } });
const matchClient = ({ name }) => 'client' === name;
const multiCompiler = webpack(config);
const clientCompiler = multiCompiler.compilers.find(matchClient);
const clientConfig = config.find(matchClient);

const devMode = (app) => {
  app.use(webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
  }));

  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler));
};

module.exports = devMode;
