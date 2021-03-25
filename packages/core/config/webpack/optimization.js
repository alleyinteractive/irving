const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * Get the context specific output configuration.
 *
 * @param {string} context The configuration context
 * @returns {object} An optimization configuration value
 */
module.exports = function getOptimization(context) {
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
        splitChunks: {
          name: 'common',
          chunks: 'all',
        },
        runtimeChunk: 'single',
      };

    case 'development_client':
      return {
        moduleIds: 'named',
        splitChunks: {
          name: 'common',
          chunks: 'all',
        },
        runtimeChunk: 'single',
      };

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
