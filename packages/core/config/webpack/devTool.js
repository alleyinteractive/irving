/**
 * Get the context specific devtool configuration.
 *
 * @param {string} context The configuration context
 * @returns {bool|string} A devtool configuration value
 */
module.exports = function getDevTool(context) {
  switch (context) {
    // For code running in NodeJS, full source maps allows easier debugging,
    // and we don't have to worry about exposing source code.
    case 'production_server':
    case 'development_server':
      return 'sourcemap';

    // a fast but helpful devtool for development.
    case 'development_client':
      return 'eval-source-map';

    // use source map plugin for more fine grain control in production
    case 'production_client':
    default:
      return false;
  }
};
