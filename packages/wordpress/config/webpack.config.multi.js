const path = require('path');
const {
  clientBuild,
  rootUrl,
  buildContext,
} = require('@irvingjs/core/config/paths');
const aliases = require('@irvingjs/core/config/aliases');
const projectAliases = Object.keys(aliases)
  .reduce((acc, alias) => {
    const aliasPath = aliases[alias];

    return {
      ...acc,
      [alias]: aliasPath.startsWith('./') ?
        path.join(buildContext, aliasPath) :
        aliasPath,
    };
  }, {});

module.exports = (multiConfig) => (
  [
    ...multiConfig,
    /**
     * Webpack config for producing block editor JS file for enqueueing in WP admin.
     */
    {
      name: 'editor',
      entry: {
        blockEditor: path.join(__dirname, '../blockEditor.js'),
      },
      mode: 'production',
      devtool: 'source-map',

      // Define module outputs
      output: {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: '[name].js',
        chunkFilename: '[name].js',
        jsonpFunction: 'irvingEditorJsonp',
      },

      externals: {
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
      },

      resolve: {
        alias: projectAliases,
      },

      // Loaders
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [
              /node_modules/,
              /\.min\.js$/,
            ],
            use: {
              loader: 'babel-loader',
              options: {
                // Needs to be at the root level, otherwise it'll modify the core config.
                extends: path.join(__dirname, '../babel.config.js'),
              },
            },
          },
        ],
      },
    },
  ]
);
