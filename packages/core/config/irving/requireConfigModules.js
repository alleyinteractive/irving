const path = require('path');
const { maybeRequire } = require('../../utils/nodeRequire');
const resolvePackageConfigs = require('./resolvePackageConfigs');

/**
 * Resolve config files and return them as an array of `require`d modules.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 */
const requireConfigModules = (filepath, base) => {
  // Get package configs.
  const configs = resolvePackageConfigs(filepath, base);
  const configModules = configs.map((configFilepath) => (
    maybeRequire(configFilepath)
  ));

  // Prevent infinite loops in testing.
  if (
    'test' === process.env.BABEL_ENV &&
    filepath.includes('babel.config.js')
  ) {
    return configModules;
  }

  // add user config.
  const userConfig = maybeRequire(path.join(base, filepath));
  if (userConfig) {
    configModules.push(userConfig);
  }

  return configModules;
};

module.exports = requireConfigModules;
