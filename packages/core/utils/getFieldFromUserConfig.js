/**
 * Get additional fields from irving configuration file.
 *
 * @param {object} config irving config object.
 * @param {string} key key to search for in config.
 * @param {string} type type of resulting config data (array or object).
 * @returns {object}
 */
export default function getFieldFromUserConfig(config, key, type) {
  const initial = 'array' === type ? [] : {};
  const hasPackages = (config.packages && Object.keys(config.packages).length);

  // Return early if an invalid key was provided or no packaged configured.
  if (! config[key] && ! hasPackages) {
    return initial;
  }

  // Get provided key from configured irving extension packages.
  const packageConfig = ! hasPackages ? initial :
    Object.keys(config.packages)
      .reduce((acc, packageName) => {
        const irvingPackage = config.packages[packageName];

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
