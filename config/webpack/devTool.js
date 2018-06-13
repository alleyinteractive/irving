module.exports = (mode, opEnv) => {
  // For code running in NodeJS, full source maps allows easier debugging,
  // and we don't have to worry about exposing source code.
  if ('server' === opEnv) {
    return 'sourcemap';
  }

  // For code running in the browser, use source map plugin for more fine grain
  // control in production, and a fast but helpful devtool for development.
  if ('client' === opEnv) {
    return 'production' === mode ? false : 'eval-source-map';
  }

  return false;
};
