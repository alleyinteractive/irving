// @todo Use joi or something similar.
const schema = require('../config/irvingConfigSchema');

function getConfigFieldType(value) {
  // Infer type of data based on schema.
  switch (true) {
    case Array.isArray(value):
      return 'array';

    case 'function' === typeof value:
      return 'function';

    default:
      return 'object';
  }
}

/**
 * Get additional fields from irving configurations.
 *
 * @param {array} configs array of irving config objects.
 * @param {string} key key to search for in config.
 * @returns {mixed}
 */
const getMergedConfigField = (configs, key) => {
  // Throw an error if no key exists.
  if (! schema[key]) {
    throw new Error(`no key ${key} exists in the Irving config schema`);
  }

  // Set initial/default value for the merged config based on type.
  const initial = schema[key];
  const type = getConfigFieldType(initial);
  const hasKey = configs.some((configPackage) => (configPackage[key]));

  // Return early if an invalid key was provided or no packaged configured.
  if (! hasKey) {
    return initial;
  }

  // Get provided key from configured irving extension packages.
  return configs.reduce((acc, config) => {
    // Merge together config fields based on type.
    switch (type) {
      case 'array':
        return [...acc, ...config[key]];

      // There should only be one configured function, so return the latest.
      case 'function':
        return config[key];

      case 'object':
        return { ...acc, ...config[key] };

      default:
        return acc;
    }
  }, initial);
};

/**
 * Get merged value from user config plus configured packages.
 *
 * @param {object} config irving config object.
 * @param {string} key key to search for in config.
 * @returns {mixed}
 */
const getMergedFromUserConfig = (userConfig, key) => {
  let { packages } = schema;

  // User empty array or user configured pacakges.
  if (userConfig.packages && userConfig.packages.length) {
    packages = userConfig.packages;
  }

  return getMergedConfigField(
    [...packages, userConfig],
    key
  );
};

module.exports = {
  getMergedConfigField,
  getMergedFromUserConfig,
};
