const getEntry = require('./entry');
const getRules = require('./rules');
const getOutput = require('./output');
const getPlugins = require('./plugins');

module.exports = (mode, opEnv) => ({
  getEntry: () => getEntry(mode, opEnv),
  getRules: () => getRules(mode, opEnv),
  getOutput: () => getOutput(mode, opEnv),
  getPlugins: () => getPlugins(mode, opEnv),
});
