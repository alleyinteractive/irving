/* eslint-disable global-require, no-console, import/order, import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const {
  getMergedConfigObject,
  getMergedConfigArray,
} = require('./getConfigValue');
const { buildContext } = require('../config/paths');
const packagejson = path.join(buildContext, 'package.json');

/**
 * Resolve the path to a config file.
 *
 * @param {string} filepath Path to config file we're looking for.
 */
const maybeRequireConfigFile = (filepath, base = buildContext) => {
  const searchPath = path.resolve(base, filepath);

  // If file exists in build context, assume the same file exists in the appRoot.
  // This will support app finding appropriate file if build happens in a different place than app execution.
  if (fs.existsSync(path.resolve(searchPath))) {
    return require(searchPath);
  }

  return null;
};

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 */
const retsolvePackageConfigs = (filepath) => {
  // Search for package versions of this file.
  const packageData = fs.readFileSync(packagejson, 'utf8');
  const userPackage = JSON.parse(packageData);
  const irvingDeps = Object.keys(userPackage.dependencies)
    .filter((dep) => dep.includes('@irvingjs'));
  return irvingDeps.map((dep) => {
    // Ignore deps in irving core to prevent infinite loops.
    if ('@irvingjs/core' === dep) {
      return null;
    }

    const configFile = maybeRequireConfigFile(
      path.join('node_modules', dep, filepath)
    );

    return configFile;
  }).filter((config) => !! config);
};

/**
 * Resolve config files and merge them together.
 *
 * @param {string} filepath Path to config file we're looking for.
 * @param {array|object} defaultValue Default value to merge found configs with.
 * @param {bool} singular Should this return only a singular value instead of an array of values to merge?
 */
const getMergedConfigFromFilesystem = (
  filepath,
  defaultValue,
  singular = false
) => {
  // We need a default in order to know what to return.
  if (! defaultValue) {
    return null;
  }

  const shouldReturnSingular = singular || 'function' === typeof defaultValue;
  const userFile = maybeRequireConfigFile(filepath);

  // If we're only looking for a single file,
  // rely on the user's version of it first if it exists.
  if (userFile && shouldReturnSingular) {
    return userFile;
  }

  const packageConfigs = retsolvePackageConfigs(filepath);

  // Return the final config file found if we're looking for a singular file.
  // @todo figure out a better way to control which is used.
  const lastConfig = packageConfigs[packageConfigs.length - 1];
  if (lastConfig && shouldReturnSingular) {
    return lastConfig;
  }

  // Add on user config and filter if it was found.
  if (userFile) {
    packageConfigs.push(userFile);
  }

  // Merge arrays if config default is an array, otherwise merge objects.
  let merged;
  if (Array.isArray(defaultValue)) {
    merged = getMergedConfigArray(packageConfigs, defaultValue);
  } else {
    merged = getMergedConfigObject(packageConfigs, defaultValue);
  }

  if (! merged) {
    return defaultValue;
  }

  return merged;
};

module.exports = getMergedConfigFromFilesystem;
