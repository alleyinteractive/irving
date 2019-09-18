/**
 * Get the context specific alias configuration.
 * @param {string} context - the configuration context
 * @returns {object} - an alias configuration value.
 */
module.exports = function getAlias(context) {
  switch (context) {
    case 'development_server':
    case 'production_server':
      return {};

    case 'development_client':
      return {
        'react-dom': '@hot-loader/react-dom',
      };

    case 'production_client':
      return {
        'react-dom': 'react-dom',
      };

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
