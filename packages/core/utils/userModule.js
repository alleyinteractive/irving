/* eslint-disable import/no-dynamic-require, global-require, import/extensions */
const fs = require('fs');
const path = require('path');
const {
  appRoot,
  buildContext,
  appIrvingRoot,
  irvingRoot,
} = require('../config/paths');

/**
 * Resolve the path to a module required in the build, fall back to irving core.
 *
 * @param {string} userPath Path to user-defined module.
 * @param {string} corePath Path to Irving core module, if different from user
 *                          path.
 */
const maybeResolveBuildModule = (userPath, corePath) => {
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
 * @param {string} userPath Path to user-defined module, relative to user app
 *                          root.
 * @param {string} corePath Path to Irving core module, relative to Irving core
 *                          root, if different from user path.
 */
const maybeResolveUserModule = (userPath, corePath) => {
  const defaultPath = corePath || userPath;

  // If file exists in build context, assume the same file exists in the
  // appRoot. This will support app finding appropriate file if build happens
  // in a different place than app execution.
  if (fs.existsSync(path.resolve(buildContext, userPath))) {
    console.log('USER FILE', path.resolve(appRoot, userPath));
    return path.resolve(appRoot, userPath);
  }

  console.log('CORE FILE', path.resolve(appIrvingRoot, defaultPath));

  // Use path to irving core relative to app root otherwise.
  return path.resolve(appIrvingRoot, defaultPath);
};

/**
 * Resolve the path to a file from specified base path.
 *
 * @param {string} requirePath Path to file we're looking for.
 * @returns {?string} Path to file, index.js file, or null if file
 *                    cannot be found.
 */
const maybeResolve = (requirePath) => {
  const parts = path.parse(requirePath);
  const initialPath = !parts.ext ? `${requirePath}.js` : requirePath;
  const indexPath = path.join(requirePath, 'index.js');

  // If file exists in build context, assume the same file exists in
  // the appRoot. This will support app finding appropriate file if build
  // happens in a different place than app execution.
  if (fs.existsSync(initialPath)) {
    return initialPath;
  }

  // Don't look for an index.js file if we already have an extension.
  if (parts.ext) {
    return null;
  }

  // Look for an index.js file also.
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  return null;
};

module.exports = {
  maybeResolve,
  maybeResolveUserModule,
  maybeResolveBuildModule,
};
