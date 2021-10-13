const nodeExternals = require('webpack-node-externals');
const getConfigService = require('./webpack');
const { buildContext } = require('./paths');
// Use unmemoized version for webpack.
const { getValueFromFiles } = require('./irving/getValueFromFiles');

module.exports = (env, argv) => {
  const { mode } = argv;
  const isProd = mode === 'production';
  const server = getConfigService(argv, 'server');
  const client = getConfigService(argv, 'client');
  const extensions = ['.js', '.jsx', '.json'];
  const multiConfig = [
    {
      context: buildContext,
      name: 'client',
      mode,
      resolve: {
        extensions,
        alias: client.getAlias(),
        symlinks: !isProd,
        fallback: {
          util: require.resolve('util'),
        },
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
        symlinks: !isProd,
      },
      // Quiet bundle size errors, as they are not applicable for code executed in NodeJS.
      performance: {
        hints: false,
      },
      // Don't polyfill NodeJS APIs, as we require a LTS NodeJS environment.
      node: false,
      externals: [
        nodeExternals({
          allowlist: [
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
        noParse: /nodeRequire/,
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
    { base: buildContext },
    [argv],
  );
  const serverConfig = getValueFromFiles(
    'config/webpack.config.server.js',
    multiConfig[1],
    { base: buildContext },
    [argv],
  );

  // Process each config using the same webpack.config.js
  const processedMultiConfig = [
    clientConfig,
    serverConfig,
  ].map((config) => (
    getValueFromFiles(
      'config/webpack.config.js',
      config,
      { base: buildContext },
      [argv],
    )
  ));

  // Process the entire multiconfig.
  const finalConfigs = getValueFromFiles(
    'config/webpack.config.multi.js',
    processedMultiConfig,
    { base: buildContext },
    [argv],
  );

  return finalConfigs;
};
