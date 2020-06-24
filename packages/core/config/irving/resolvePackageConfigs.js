const path = require('path');
const fs = require('fs');
const { buildContext } = require('../paths');
const packagejson = path.join(buildContext, 'package.json');
const defaultIgnorePackages = [
  '@irvingjs/core',
  '@irvingjs/babel-preset-irving',
];

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {object} opts Options for finding config files.
 * @param {string} opts.base - Base filepath to look for config files in.
 * @param {array}  opts.ignorePackages - Array of packages to ignore when looking for files.
 */
const resolvePackageConfigs = (filepath, opts) => {
  const {
    base,
    ignorePackages = [],
  } = opts;
  const ignore = [
    ...defaultIgnorePackages,
    ...ignorePackages,
  ];

  // Search for package versions of this file.
  const packageData = fs.readFileSync(packagejson, 'utf8');
  const userPackage = JSON.parse(packageData);
  const irvingDeps = Object.keys(userPackage.dependencies)
    .filter((dep) => dep.includes('@irvingjs'));
  return irvingDeps.map((dep) => {
    // Ignore certain dependencies to prevent infinite loops.
    if (ignore.includes(dep)) {
      return null;
    }

    const configFile = path.resolve(base, 'node_modules', dep, filepath);
    return configFile;
  }).filter((config) => !! config);
};

module.exports = resolvePackageConfigs;
