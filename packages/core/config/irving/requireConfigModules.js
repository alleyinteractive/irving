const path = require('path');
const { maybeRequire } = require('../../utils/nodeRequire');
const resolvePackageConfigs = require('./resolvePackageConfigs');

/**
 * Resolve config files and return them as an array of `require`d modules.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {object} opts Options for finding config files.
 * @param {string} opts.base - Base filepath to look for config files in.
 * @param {array}  opts.ignorePackages - Array of packages to ignore when looking for files.
 */
const requireConfigModules = (filepath, opts) => {
  // Get package configs.
  const configs = resolvePackageConfigs(filepath, opts);
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
  const userConfig = maybeRequire(path.join(opts.base, filepath));
  if (userConfig) {
    configModules.push(userConfig);
  }

  return configModules.filter((module) => module);
};

module.exports = requireConfigModules;
