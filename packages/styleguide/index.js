/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path');
const merge = require('lodash/fp/merge');
const {
  getMergedFromUserConfig,
} = require('@irvingjs/core/utils/getMergedConfigField');
const { getConfigObject } = require('@irvingjs/core/utils/getConfigValue');
const { buildContext } = require('@irvingjs/core/config/paths');
const styleguideBase = require('./config/styleguide.config.base');
const coreComponents = require('./config/styleguide.config.core');
const userConfig = require(path.join(buildContext, 'irving.config.server.js'));
const configBase = merge(coreComponents, styleguideBase);
let mergedConfig = configBase;

// Set babel env.
process.env.BABEL_ENV = 'app';

if (userConfig && userConfig.styleguideConfig) {
  const styleguideConfigs = getConfigObject('styleguideConfig');
  const styleguideSetupPaths = getMergedFromUserConfig(
    userConfig,
    'styleguideSetup'
  );
  mergedConfig = merge(styleguideConfigs, configBase);

  mergedConfig.require = [
    ...mergedConfig.require,
    ...styleguideSetupPaths,
  ];
}

module.exports = mergedConfig;
