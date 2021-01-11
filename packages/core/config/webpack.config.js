const nodeExternals = require('webpack-node-externals');
const getConfigService = require('./webpack');
const { buildContext } = require('./paths');
// Use unmemoized version for webpack.
const { getValueFromFiles } = require('./irving/getValueFromFiles');

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProd = 'production' === mode;
  const client = getConfigService(mode, 'client', 'module');
  const clientLegacy = getConfigService(mode, 'client', 'es5');
  const server = getConfigService(mode, 'server', 'node');
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
      name: 'client-es5',
      mode,
      resolve: {
        extensions,
        alias: clientLegacy.getAlias(),
        symlinks: ! isProd,
      },
      devtool: clientLegacy.getDevTool(),
      entry: clientLegacy.getEntry(),
      output: clientLegacy.getOutput(),
      module: {
        rules: clientLegacy.getRules(),
      },
      plugins: clientLegacy.getPlugins(),
      optimization: clientLegacy.getOptimization(),
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
    'config/webpack.config.client.js',
    multiConfig[0],
    { base: buildContext }
  );
  const es5Config = getValueFromFiles(
    'config/webpack.config.es5.js',
    multiConfig[1],
    { base: buildContext }
  );
  const serverConfig = getValueFromFiles(
    'config/webpack.config.server.js',
    multiConfig[2],
    { base: buildContext }
  );

  // Process each config using the same webpack.config.js
  const processedMultiConfig = [
    [clientConfig, 'module'],
    [es5Config, 'es5'],
    [serverConfig, 'node'],
  ].map(([config, target]) => (
    getValueFromFiles(
      'config/webpack.config.js',
      config,
      { base: buildContext },
      [target]
    )
  ));

  // Process the entire multiconfig.
  const finalConfigs = getValueFromFiles(
    'config/webpack.config.multi.js',
    processedMultiConfig,
    { base: buildContext }
  );

  return finalConfigs;
};
