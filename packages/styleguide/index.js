const merge = require('lodash/merge');
const styleguideBase = require('./config/styleguide.config.base');

function createStyleguideConfig(...configs) {
  return merge(styleguideBase, ...configs);
}

module.exports = createStyleguideConfig;
