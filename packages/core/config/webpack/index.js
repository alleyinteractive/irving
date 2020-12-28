const getAlias = require('./alias');
const getEntry = require('./entry');
const getRules = require('./rules');
const getOutput = require('./output');
const getPlugins = require('./plugins');
const getDevTool = require('./devTool');
const getOptimization = require('./optimization');

/**
 * Get a configuration service based on the context parameters.
 *
 * @param {string} mode Production or development
 * @param {string} opEnv Server or client
 * @param {string} target Webpack bundle target
 * @returns {object} Configuration service
 */
module.exports = function getConfigService(mode, opEnv, target = 'web') {
  const context = `${mode}_${opEnv}`;

  return {
    getAlias: () => getAlias(context, target),
    getEntry: () => getEntry(context, target),
    getRules: () => getRules(context, target),
    getOptimization: () => getOptimization(context, target),
    getOutput: () => getOutput(context, target),
    getPlugins: () => getPlugins(context, target),
    getDevTool: () => getDevTool(context, target),
  };
};
