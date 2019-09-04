const { maybeResolveUserModule } = require(
  '../../utils/maybeRequireUserModule'
);

/**
 * Get the context specific alias configuration.
 * @param {string} context - the configuration context
 * @returns {object} - an alias configuration value.
 */
module.exports = function getAlias(context) {

  /**
   * Create webpack aliases to resolve files containing user-customizable
   * irving functionality and include them in the appropriate bundle.
   *
   * @param {array} aliases Aliases for user-customizable functionality in irving.
   */
  const createCustomizableAliases = (aliases) => (
    Object.keys(aliases).reduce((acc, key) => {
      acc[`@irving/custom/${key}`] = maybeResolveUserModule(
        aliases[key]
      );
      return acc;
    }, {})
  );

  switch (context) {
    case 'development_server':
    case 'production_server':
      return createCustomizableAliases({
        renderAppWrapper: 'server/renderAppWrapper.js',
        renderErrorMessageWrapper: 'server/renderErrorMessageWrapper.js',
      });

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
