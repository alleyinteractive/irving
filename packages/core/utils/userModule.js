/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs');
const path = require('path');
const {
  appRoot,
  buildContext,
  appIrvingRoot,
  irvingRoot,
} = require('../config/paths.js');

/**
 * Resolve the path to a module required in the build, fall back to irving core.
 *
 * @param {string} userPath Path to user-defined module.
 * @param {string} corePath Path to Irving core module, if different from user path.
 */
module.exports.maybeResolveBuildModule = (userPath, corePath) => {
  const defaultPath = corePath || userPath;

  // Resolve file relative to build context if it exists.
  if (fs.existsSync(path.resolve(buildContext, userPath))) {
    return path.resolve(buildContext, userPath);
  }

  // Resolve file relative to irving app in build context otherwise.
  return path.resolve(irvingRoot, defaultPath);
};

/**
 * Resolve the path to a user module, falling back to Irving core version.
 *
 * @param {string} userPath Path to user-defined module, relative to user app root.
 * @param {string} corePath Path to Irving core module, relative to Irving core root, if different from user path.
 */
const maybeResolveUserModule = (userPath, corePath) => {
  const defaultPath = corePath || userPath;

  // If file exists in build context, assume the same file exists in the appRoot.
  // This will support app finding appropriate file if build happens in a different place than app execution.
  if (fs.existsSync(path.resolve(buildContext, userPath))) {
    return path.resolve(appRoot, userPath);
  }

  // Use path to irving core relative to app root otherwise.
  return path.resolve(appIrvingRoot, defaultPath);
};

module.exports.maybeResolveUserModule = maybeResolveUserModule;

/**
 * Same as above, but require the module instead.
 *
 * @param {string} userPath Path to user-defined module, relative to user app root.
 * @param {string} corePath Path to Irving core module, relative to Irving core root, if different from user path.
 */
module.exports.maybeRequireUserModule = (userPath, corePath) => (
  require(
    maybeResolveUserModule(userPath, corePath)
  )
);
