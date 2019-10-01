const getAlias = require('./alias');
const getEntry = require('./entry');
const getRules = require('./rules');
const getOutput = require('./output');
const getPlugins = require('./plugins');
const getDevTool = require('./devTool');

/**
 * Get a configuration service based on the context parameters.
 * @param {string} mode - production or development
 * @param {string} opEnv - server or client
 * @returns {object} - configuration service
 */
module.exports = function getConfigService(mode, opEnv) {
  const context = `${mode}_${opEnv}`;

  return {
    getAlias: () => getAlias(context),
    getEntry: () => getEntry(context),
    getRules: () => getRules(context),
    getOutput: () => getOutput(context),
    getPlugins: () => getPlugins(context),
    getDevTool: () => getDevTool(context),
  };
};
