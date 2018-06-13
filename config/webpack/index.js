const getEntry = require('./entry');
const getRules = require('./rules');
const getOutput = require('./output');
const getPlugins = require('./plugins');
const getDevTool = require('./devTool');

/**
 *
 * @param {string} mode
 * @param {string} opEnv
 * @returns {object}
 */
module.exports = function getConfig(mode, opEnv) {
  const context = `${mode}_${opEnv}`;
  return {
    getEntry: () => getEntry(context),
    getRules: () => getRules(context),
    getOutput: () => getOutput(context),
    getPlugins: () => getPlugins(context),
    getDevTool: () => getDevTool(context),
  };
};
