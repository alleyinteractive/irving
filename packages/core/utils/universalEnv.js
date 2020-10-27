const maybeAddMultisiteContext = require('./maybeAddMultisiteContext');

const getEnv = () => {
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle

  return maybeAddMultisiteContext(
    env,
    env.IRVING_MULTISITE_CONTEXT,
    window.location.host
  );
};

export default getEnv;
