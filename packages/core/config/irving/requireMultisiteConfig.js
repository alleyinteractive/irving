const uniq = require('lodash/uniq');
const { appRoot, multisiteConfig } = require('../paths');
const requireConfigModules = require('./requireConfigModules');

module.exports = (() => {
  // Retrieve the multisite configuration.
  const config = requireConfigModules(
    multisiteConfig,
    {
      base: appRoot,
      ignorePackages: [],
    }
  );
  // If no configuration exists, return null.
  if (0 === config.length) {
    return null;
  }
  // If a configuration exists, ensure it is only returned once in a flat array.
  return uniq(config, 'domain').flat();
})();
