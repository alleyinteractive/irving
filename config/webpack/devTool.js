module.exports = (mode, opEnv) => {
  if ('server' === opEnv || 'production' === mode) {
    return 'sourcemap';
  }

  return 'eval-source-map';
};
