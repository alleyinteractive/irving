/**
 * Get additional fields from irving configuration file.
 *
 * @param {object} config irving config object.
 * @param {string} key key to search for in config.
 * @returns {object}
 */
export default function getMergedConfigField(config, key) {
  // Value against which to determine type of data config is expecting.
  const checkValue = (config[key] && 'function' === typeof config[key]) ?
    config[key]() : config[key];
  // Infer type of data for this config field.
  const type = (Array.isArray(checkValue)) ? 'array' : 'object';
  // Set initial/default value for the merged config based on type.
  const initial = 'array' === type ? [] : {};
  // Determine if there are any packages configured in the user config.
  const hasPackages = (config.packages && config.packages.length);

  // Return early if an invalid key was provided or no packaged configured.
  if (! config[key] && ! hasPackages) {
    return initial;
  }

  // Get provided key from configured irving extension packages.
  const packageConfig = ! hasPackages ? initial :
    config.packages.reduce((acc, irvingPackage) => {
      // If package has provided key, spread them into the accumulator.
      if (irvingPackage[key] && 'function' === typeof irvingPackage[key]) {
        return 'array' === type ? [
          ...acc,
          ...irvingPackage[key](),
        ] : {
          ...acc,
          ...irvingPackage[key](),
        };
      }

      // Return accumulator as-is if package has no provided key.
      return acc;
    }, initial);

  // Get user-configured data.
  const userConfig = config[key] ?
    config[key]() : initial;

  // Spread results and return.
  return 'array' === type ? [
    ...packageConfig,
    ...userConfig,
  ] : {
    ...packageConfig,
    ...userConfig,
  };
}
