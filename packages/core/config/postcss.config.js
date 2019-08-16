// Plugins
const lost = require('lost');
const calc = require('postcss-calc');
const cssImport = require('postcss-import');
const variables = require('postcss-simple-vars');
const nested = require('postcss-nested');
const units = require('postcss-units');
const colorFunction = require('postcss-color-function');
const autoprefixer = require('autoprefixer');
const mixins = require('postcss-sassy-mixins');
const focus = require('postcss-focus');
const stylelint = require('stylelint');
const browserReporter = require('postcss-browser-reporter');
const reporter = require('postcss-reporter');

// Other imports
const paths = require('./paths');
const stylelintConfig = require('./stylelint.config.js');
const cssVars = require('./css');
const flatten = require('../utils/flatten');

// Config
module.exports = () => ({
  plugins: [
    stylelint(stylelintConfig),
    cssImport({
      path: [
        paths.globalStyles,
      ],
    }), // Import files
    variables({
      variables: flatten(cssVars),
    }),
    units(), // Compute rem() function
    mixins(),
    nested(), // Allow nested syntax.
    calc({
      mediaQueries: true,
    }),
    colorFunction(),
    lost({
      flexbox: 'flex',
    }), // Grid library
    focus(),
    autoprefixer({
      flexbox: 'no-2009',
    }),
    browserReporter(),
    reporter(),
  ],
});
