const getEnv = () => (
  (
    'undefined' !== typeof process &&
    Object.keys(process.env).length
  ) ? process.env : window.__ENV__ // eslint-disable-line no-underscore-dangle
);

module.exports = getEnv;
