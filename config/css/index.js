/**
 * Merged custom props and custom media.
 * Import this to use any css custom props or media in JS.
 *
 * NOTE: we need to provide these to postcss as well, which doesn't like import statements (yet)
 */

/* eslint-disable global-require */
module.exports = {
  colors: require('./colors'),
  fonts: require('./fonts'),
  animations: require('./animations'),
  breakpoints: require('./breakpoints'),
  bkptVal: require('./breakpoints').bkptVal,
  ui: require('./ui'),
};
/* eslint-enable */
