const path = require('path');
const fs = require('fs');
const { buildContext } = require('../paths');
const packagejson = path.join(buildContext, 'package.json');
const ignorePackages = [
  '@irvingjs/core',
  '@irvingjs/babel-preset-irving',
];

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {string} base Base filepath to look for files in.
 */
const resolvePackageConfigs = (filepath, base) => {
  // Search for package versions of this file.
  const packageData = fs.readFileSync(packagejson, 'utf8');
  const userPackage = JSON.parse(packageData);
  const irvingDeps = Object.keys(userPackage.dependencies)
    .filter((dep) => dep.includes('@irvingjs'));
  return irvingDeps.map((dep) => {
    // Ignore certain dependencies to prevent infinite loops.
    if (ignorePackages.includes(dep)) {
      return null;
    }

    const configFile = path.resolve(base, 'node_modules', dep, filepath);
    return configFile;
  }).filter((config) => !! config);
};

module.exports = resolvePackageConfigs;
