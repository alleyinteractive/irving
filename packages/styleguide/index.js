/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path');
const merge = require('lodash/fp/merge');
const {
  getMergedFromUserConfig,
} = require('@irvingjs/core/utils/getMergedConfigField');
const { buildContext } = require('@irvingjs/core/config/paths');
const styleguideBase = require('./config/styleguide.config.base');
const coreComponents = require('./config/styleguide.config.core');
const userConfig = require(path.join(buildContext, 'irving.config.js'));
const configBase = merge(styleguideBase, coreComponents);
let mergedConfig = configBase;

if (userConfig && userConfig.styleguideConfig) {
  const styleguideConfigPaths = getMergedFromUserConfig(
    userConfig,
    'styleguideConfig'
  );
  const styleguideSetupPaths = getMergedFromUserConfig(
    userConfig,
    'styleguideSetup'
  );
  mergedConfig = styleguideConfigPaths.reduce((acc, configPath) => {
    const config = require(path.join(buildContext, configPath));

    return merge(config, acc);
  }, configBase);

  mergedConfig.require = [
    ...mergedConfig.require,
    ...styleguideSetupPaths,
  ];
}

module.exports = mergedConfig;
