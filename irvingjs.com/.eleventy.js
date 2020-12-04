const irving = require('./_eleventy/irving-plugin');
const svgContents = require("eleventy-plugin-svg-contents");

// Plugins.
module.exports = function(eleventyConfig) {
  // Override BrowserSync options.
  eleventyConfig.setBrowserSyncConfig({
    open: true,
  });

  // Plugins.
  eleventyConfig.addPlugin(irving);
  eleventyConfig.addPlugin(svgContents);

  // Add scss to watch command.
  eleventyConfig.addWatchTarget('./_scss/');

  // Copy images to the appropriate location.
  eleventyConfig.addPassthroughCopy({
    'images/favicons/*': '.',
    'images/social/*': '.',
    'images/shapes/*': 'images/shapes/',
    'images/*': 'images',
    'fonts': 'fonts',
  });

  // The Config object.
  return {
    dir: {
      output: 'dist',
      layouts: '_layouts',
    }
  };
};