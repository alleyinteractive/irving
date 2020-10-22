const uniq = require('lodash/uniq');
const { appRoot, multisiteConfig } = require('../paths');
const requireConfigModules = require('./requireConfigModules');

module.exports = (() => {
  const config = requireConfigModules(
    multisiteConfig,
    {
      base: appRoot,
      ignorePackages: [],
    }
  );

  return uniq(config, 'domain').flat();
})();
