/**
 * Get additional sagas from irving configuration file.
 *
 * @returns {array}
 */
export default function getConfigSagas(config) {
  // Get reducers from configured irving extension packages.
  const packageSagas = Object.keys(config.packages)
    .reducer((acc, packageName) => {
      const irvingPackage = config.packages[packageName];

      if (irvingPackage.sagas) {
        return acc.concat(irvingPackage.sagas());
      }

      return acc;
    }, []);

  // Get user-configured reducers.
  const configReducers = config.sagas || [];

  return [
    ...packageSagas,
    ...configReducers,
  ];
}
