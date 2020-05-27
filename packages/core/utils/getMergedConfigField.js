// @todo Use joi or something similar.
const schema = require('../config/irvingConfigSchema');

/**
 * Infer type based on a config value.
 *
 * @param {mixed} value value to check.
 * @returns {string}
 */
function getConfigFieldType(value) {
  // Infer type of data based on schema.
  switch (true) {
    case Array.isArray(value):
      return 'array';

    case 'function' === typeof value:
      return 'function';

    default:
      return 'array';
  }
}

/**
 * Get the initial reducer value for a particular config data type.
 *
 * @param {string} type type to check.
 * @returns {mixed}
 */
function getInitialValue(type) {
  // Infer type of data based on schema.
  switch (type) {
    case 'array':
      return [];

    case 'function':
      return () => {};

    default:
      return [];
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
  const type = getConfigFieldType(schema[key]);
  const initial = getInitialValue(type);
  const hasKey = configs.some((config) => config[key]);

  // Return early if an invalid key was provided or no packaged configured.
  if (! hasKey) {
    return initial;
  }

  // Get provided key from configured irving extension packages.
  return configs.reduce((acc, config) => {
    // Return early if config key doesn't exist.
    if (! config[key]) {
      return acc;
    }

    // Merge together config fields based on type.
    switch (type) {
      case 'array':
        acc.push(config[key]);
        return acc;

      // There should only be one configured function, so return the latest.
      case 'function':
        return config[key];

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
