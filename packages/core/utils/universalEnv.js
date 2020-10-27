const maybeReplaceRootVars = require('./maybeReplaceRootVars');

const getEnv = () => {
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle

  return maybeReplaceRootVars(
    env,
    env.IRVING_MULTISITE_CONTEXT,
    window.location.host
  );
};

export default getEnv;
