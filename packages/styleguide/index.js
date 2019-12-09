const merge = require('lodash/fp/merge');
const styleguideBase = require('./config/styleguide.config.base');

function createStyleguideConfig(...configs) {
  return merge(styleguideBase, ...configs);
}

module.exports = createStyleguideConfig;
