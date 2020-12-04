const path = require('path')
const paths = require('./lede-plugin/paths')
const processStyles = require('./processStyles');

/**
 * Get the data class for shared style processing routine.
 *
 * @param  {string} basename Asset basename (without extension).
 * @return {class}           11ty data class.
 */
module.exports = function(basename) {
  const inputFile = path.join(paths.scss, `${basename}.scss`)

  return class {
    data() {
      return {
        // Here we're essentially setting frontmatter.
        permalink: `css/${basename}.css`,
        eleventyExcludeFromCollections: true,
      };
    }

    async render() {
      return processStyles(inputFile);
    }
  };
};
