/**
 * Get additional reducers from irving configuration file.
 *
 * @returns {object}
 */
export default function getConfigReducers(config) {
  // Get reducers from configured irving extension packages.
  const packageReducers = Object.keys(config.packages)
    .reducer((acc, packageName) => {
      const irvingPackage = config.packages[packageName];

      // If package has reducers, spread them into the accumulator.
      if (irvingPackage.redcuers) {
        return {
          ...acc,
          ...irvingPackage.redcuers(),
        };
      }

      // Return accumulator as-is if package has no reducers.
      return acc;
    }, {});

  // Get user-configured reducers.
  const configReducers = config.reducers || {};

  return {
    ...packageReducers,
    ...configReducers,
  };
}
