const path = require('path');
const {
  clientBuild,
  rootUrl,
  buildContext,
} = require('@irvingjs/core/config/paths');
const coreAliases = require('@irvingjs/core/config/aliases');

const aliases = Object.keys(coreAliases)
  .reduce((acc, alias) => {
    const aliasPath = coreAliases[alias];

    return {
      ...acc,
      [alias]: aliasPath.startsWith('./')
        ? path.join(buildContext, aliasPath)
        : aliasPath,
    };
  }, {});

module.exports = (multiConfig) => {
  // Modify the client build's clean webpack plugin to prevent it from
  // removing blockEditor assets (this config can handle that separately as necessary).
  // eslint-disable-next-line no-param-reassign
  multiConfig[0].plugins = multiConfig[0].plugins
    .map((pluginInstance) => {
      if (pluginInstance.cleanOnceBeforeBuildPatterns) {
        pluginInstance.cleanOnceBeforeBuildPatterns.push(
          '!**/blockEditor**',
        );
      }

      return pluginInstance;
    });

  return [
    ...multiConfig,
    /**
     * Webpack config for producing block editor JS file for enqueueing in WP admin.
     */
    {
      name: 'editor',
      entry: {
        blockEditor: path.join(__dirname, '../blockEditor.jsx'),
      },
      mode: 'production',
      devtool: 'source-map',

      // Define module outputs
      output: {
        path: clientBuild,
        publicPath: `${rootUrl}/`,
        filename: '[name].js',
        chunkFilename: '[name].js',
      },

      externals: {
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
      },

      resolve: {
        alias: aliases,
        extensions: ['.js', '.jsx', '.json'],
      },

      // Loaders
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: (filepath) => (
              (
                (
                  (
                    filepath.includes(buildContext)
                    || filepath.includes(path.join(__dirname, '../../'))
                  )
                  && !filepath.includes('node_modules')
                )
                // Anything imported within irving packages should be included in build,
                // even if located within node_modules (but not nested node modules).
                || filepath.match(
                  /node_modules\/@irvingjs\/[^/]*\/(?!node_modules)/,
                )
              )
              // Exclude minified JS.
              && !filepath.match(/\.min\.js$/)
            ),
            use: {
              loader: 'babel-loader',
              options: {
                // Needs to be at the root level, otherwise it'll modify the core config.
                extends: path.join(__dirname, '../babel.config.js'),
              },
            },
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
  ];
};
