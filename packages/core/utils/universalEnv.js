/* eslint-disable  no-underscore-dangle */
const getEnv = () => {
  const env = Object.keys(process.env).length ? process.env : window.__ENV__;

  // If the `MULTISITE_CONTEXT` property has been added to window.__ENV__ during
  // the webpack build process, replace instances of ROOT_URL and API_ROOT_URL
  // with the corresponding values in the multisite configuration.
  if (env.MULTISITE_CONTEXT) {
    const { host } = window.location;
    const hostIndex = env.MULTISITE_CONTEXT.map((i) => i.domain).indexOf(host);

    if (- 1 < hostIndex) {
      // Replace vars with those at the current host index.
      env.ROOT_URL = env.MULTISITE_CONTEXT[hostIndex].vars.ROOT_URL;
      env.API_ROOT_URL = env.MULTISITE_CONTEXT[hostIndex].vars.API_ROOT_URL;
      // Delete the MULTISITE_CONTEXT property and prevent it from being
      // passed through the `getEnv()` function.
      delete env.MULTISITE_CONTEXT;
    }
  }

  return env;
};

export default getEnv;
