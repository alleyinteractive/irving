const getEntry = require('./entry');
const getRules = require('./rules');
const getOutput = require('./output');
const getPlugins = require('./plugins');
const getDevTool = require('./devTool');

module.exports = (mode, opEnv) => ({
  getEntry: () => getEntry(mode, opEnv),
  getRules: () => getRules(mode, opEnv),
  getOutput: () => getOutput(mode, opEnv),
  getPlugins: () => getPlugins(mode, opEnv),
  getDevTool: () => getDevTool(mode, opEnv),
});
