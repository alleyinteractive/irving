const config = require('../../_data/config');
const inlineCSS = require('./shortcodes/inlineCSS');

/**
 * Plugin for IrvingJS.com.
 */
module.exports = function(eleventyConfig, opts = {}) {
  const irvingConfig = config();

  // Shortcodes.
  eleventyConfig.addShortcode('inlineCSS', inlineCSS);
};
