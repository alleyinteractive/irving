const getEnv = () => (
  (
    typeof process !== 'undefined'
    && Object.keys(process.env).length
  ) ? process.env : window.__ENV__ // eslint-disable-line no-underscore-dangle
);

module.exports = getEnv;
