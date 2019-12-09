const merge = require('lodash/merge');
const styleguideBase = require('./config/styleguide.config.base');

function createStyleguideConfig(...configs) {
  const intialConfig = merge(styleguideBase, ...configs);
  // Helper to merge arrays provided a config key.
  const mergeConfigArray = (key) => (
    configs.reduce(
      (acc, config) => {
        if (config[key]) {
          return [...acc, ...config[key]];
        }

        return acc;
      },
      []
    )
  );

  // Merge config fields that need to be merged in order to get packages/user configs working.
  const mergedFields = {
    ...styleguideBase,
    sections: mergeConfigArray('sections'),
    require: mergeConfigArray('require'),
    ignore: mergeConfigArray('ignore'),
  };

  return merge(intialConfig, mergedFields);
}

module.exports = createStyleguideConfig;
