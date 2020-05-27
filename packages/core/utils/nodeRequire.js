/* eslint-disable import/no-dynamic-require, global-require */
/**
 * IMPORTANT NOTE: THIS FILE IS NOT PROCESSED BY WEBPACK OR BABEL, PROCEED WITH CAUTION.
 */

/**
 * Alias for node require statement.
 * Necessary to prevent webpack from attempting to resolve node-only require statements.
 *
 * @param {string} requirePath Path to user-defined module, relative to user app root.
 */
module.exports.nodeRequire = (requirePath) => (
  require(requirePath)
);
/* eslint-enable */
