/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs');
const path = require('path');
/**
 * IMPORTANT NOTE: THIS FILE IS NOT PROCESSED BY WEBPACK OR BABEL, PROCEED WITH CAUTION.
 */

/**
 * Alias for node require statement.
 * Necessary to prevent webpack from attempting to resolve node-only require statements.
 *
 * @param {string} requirePath Path to user-defined module, relative to user app root.
 */
const nodeRequire = (requirePath) => (
  require(requirePath)
);

/**
 * Resolve the path to a file from specified base path.
 *
 * @param {string} requirePath Path to file we're looking for.
 */
const maybeRequire = (requirePath) => {
  // If file exists in build context, assume the same file exists in the appRoot.
  // This will support app finding appropriate file if build happens in a different place than app execution.
  if (fs.existsSync(requirePath)) {
    return nodeRequire(requirePath);
  }

  // Don't look for an index.js file if we already have an extension.
  if (requirePath.includes('.js')) {
    return null;
  }

  // Look for an index.js file also.
  const indexPath = path.join(requirePath, 'index.js');
  if (fs.existsSync(indexPath)) {
    return nodeRequire(indexPath);
  }

  return null;
};

module.exports = {
  nodeRequire,
  maybeRequire,
};
/* eslint-enable */
