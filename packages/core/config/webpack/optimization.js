const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * Get the context specific output configuration.
 *
 * @param {string} context The configuration context
 * @returns {object} An optimization configuration value
 */
module.exports = function getOptimization(context) {
  const splitChunks = {
    cacheGroups: {
      common: {
        name: 'common',
        chunks: 'all',
        minChunks: 2,
      },
      polyfills: {
        name: 'polyfills',
        test: /node_modules\/core-js/,
        chunks: 'all',
      },
    },
  };

  switch (context) {
    case 'production_server':
    case 'development_server':
      return {
        // This keeps the emitted code readable if we need to review it manually.
        // Minimization isn't useful for NodeJS anyways.
        minimize: false,
      };

    case 'production_client':
      return {
        minimizer: [
          new TerserJSPlugin({}),
          new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks,
        runtimeChunk: 'single',
      };

    case 'development_client':
      return {
        namedModules: true,
        splitChunks,
      };

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
