const { serverConfig: serverConfigPath } = require('../config/paths');
// eslint-disable-next-line import/no-dynamic-require
const serverConfig = require(serverConfigPath);
const { getMergedFromUserConfig } = require('./utils/getMergedConfigField');

module.exports = (key) => getMergedFromUserConfig(serverConfig, key);
