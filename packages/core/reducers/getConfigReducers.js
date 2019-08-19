/**
 * Get additional reducers from irving configuration file.
 *
 * @param {object} config irving config object.
 * @returns {object}
 */
export default function getConfigReducers(config) {
  // Get reducers from configured irving extension packages.
  const packageReducers = ! config.packages ? {} :
    Object.keys(config.packages)
      .reduce((acc, packageName) => {
        const irvingPackage = config.packages[packageName];

        // If package has reducers, spread them into the accumulator.
        if (irvingPackage.reducers) {
          return {
            ...acc,
            ...irvingPackage.reducers(),
          };
        }

        // Return accumulator as-is if package has no reducers.
        return acc;
      }, {});

  // Get user-configured reducers.
  const configReducers = config.reducers ?
    config.reducers() : {};

  return {
    ...packageReducers,
    ...configReducers,
  };
}
