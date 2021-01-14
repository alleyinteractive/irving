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
 * @param {object} argv CLI arguments.
 * @param {string} opEnv Server or client
 * @returns {object} Configuration service
 */
module.exports = function getConfigService(argv, opEnv) {
  const { mode } = argv;
  const context = `${mode}_${opEnv}`;

  return {
    getAlias: () => getAlias(context, argv),
    getEntry: () => getEntry(context, argv),
    getRules: () => getRules(context, argv),
    getOptimization: () => getOptimization(context, argv),
    getOutput: () => getOutput(context, argv),
    getPlugins: () => getPlugins(context, argv),
    getDevTool: () => getDevTool(context, argv),
  };
};
