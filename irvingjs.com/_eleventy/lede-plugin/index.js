const config = require('../../_data/config');
const inlineCSS = require('./shortcodes/inlineCSS');

/**
 * Plugin for Lede landing pages.
 */
module.exports = function(eleventyConfig, opts = {}) {
  const ledeConfig = config();

  // Shortcodes.
  eleventyConfig.addShortcode('inlineCSS', inlineCSS);
};
