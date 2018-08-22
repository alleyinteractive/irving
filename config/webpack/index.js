const getEntry = require('./entry');
const getRules = require('./rules');
const getOutput = require('./output');
const getPlugins = require('./plugins');
const getDevTool = require('./devTool');
const getEnv = require('./env');

/**
 * Get a configuration service based on the context parameters.
 * @param {string} mode - production or development
 * @param {string} opEnv - server or client
 * @returns {object} - configuration service
 */
module.exports = function getConfigService(mode, opEnv) {
  const context = `${mode}_${opEnv}`;
  return {
    getEntry: () => getEntry(context),
    getRules: () => getRules(context),
    getOutput: () => getOutput(context),
    getPlugins: () => getPlugins(context),
    getDevTool: () => getDevTool(context),
  };
};
