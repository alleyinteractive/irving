/* eslint-disable import/no-dynamic-require, global-require */
const { maybeResolve } = require('./userModule');

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
  const validatedPath = maybeResolve(requirePath);

  if (validatedPath) {
    return nodeRequire(validatedPath);
  }

  return null;
};

module.exports = {
  nodeRequire,
  maybeRequire,
};
/* eslint-enable */
