/**
 * Get additional sagas from irving configuration file.
 *
 * @returns {array}
 */
export default function getConfigSagas(config) {
  // Get reducers from configured irving extension packages.
  const packageSagas = ! config.packages ? [] :
    Object.keys(config.packages)
      .reduce((acc, packageName) => {
        const irvingPackage = config.packages[packageName];

        if (irvingPackage.sagas) {
          return acc.concat(irvingPackage.sagas());
        }

        return acc;
      }, []);

  // Get user-configured reducers.
  const configReducers = config.sagas ? config.sagas() : [];

  return [
    ...packageSagas,
    ...configReducers,
  ];
}
