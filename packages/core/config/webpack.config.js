const nodeExternals = require('webpack-node-externals');
const getConfigService = require('./webpack');
const { buildContext } = require('./paths');
// Use unmemoized version for webpack.
const { getValueFromFiles } = require('./irving/getValueFromFiles');

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProd = 'production' === mode;
  const server = getConfigService(mode, 'server');
  const client = getConfigService(mode, 'client');
  const extensions = ['.js', '.json'];
  const multiConfig = [
    {
      context: buildContext,
      name: 'client',
      mode,
      resolve: {
        extensions,
        alias: client.getAlias(),
        symlinks: ! isProd,
      },
      devtool: client.getDevTool(),
      entry: client.getEntry(),
      output: client.getOutput(),
      module: {
        rules: client.getRules(),
      },
      plugins: client.getPlugins(),
      optimization: client.getOptimization(),
    },
    {
      context: buildContext,
      name: 'server',
      mode,
      devtool: server.getDevTool(),
      target: 'node',
      resolve: {
        extensions,
        alias: server.getAlias(),
        symlinks: ! isProd,
      },
      // Quiet bundle size errors, as they are not applicable for code executed in NodeJS.
      performance: {
        hints: false,
      },
      // Don't polyfill NodeJS APIs, as we require a LTS NodeJS environment.
      node: false,
      externals: [
        nodeExternals({
          whitelist: [
            // Allow references to vendor css, so we can include them in our bundle.
            /\.css$/,
            /babel-plugin-universal-import/,
            /react-universal-component/,
            /webpack-flush-chunks/,
            // Include other irving packages in node_modules.
            /@irvingjs/,
          ],
        }),
      ],
      entry: server.getEntry(),
      output: server.getOutput(),
      module: {
        noParse: [/nodeRequire/],
        rules: server.getRules(),
      },
      plugins: server.getPlugins(),
      optimization: server.getOptimization(),
    },
  ];

  // Process configs separately if env-specific files are provided.
  const clientConfig = getValueFromFiles(
    'webpack.config.client.js',
    buildContext,
    multiConfig[0]
  );
  const serverConfig = getValueFromFiles(
    'webpack.config.server.js',
    buildContext,
    multiConfig[1]
  );

  // Process each config using the same webpack.config.js
  const finalConfigs = [
    clientConfig,
    serverConfig,
  ].map((config) => (
    getValueFromFiles('webpack.config.js', buildContext, config)
  ));

  return finalConfigs;
};
