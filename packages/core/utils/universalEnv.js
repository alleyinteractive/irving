/* eslint-disable  no-underscore-dangle */
const getEnv = () => {
  const env = Object.keys(process.env).length ? process.env : window.__ENV__;

  const multisiteContext = env.IRVING_MULTISITE_CONTEXT;
  // If the multisite context property has been added to window.__ENV__ during
  // the build process, replace instances of ROOT_URL and API_ROOT_URL with the
  // corresponding values in the multisite configuration.
  if (multisiteContext) {
    const { host } = window.location;
    const hostIndex = multisiteContext.map((i) => i.domain).indexOf(host);

    if (- 1 < hostIndex) {
      // Replace vars with those at the current host index.
      env.ROOT_URL = multisiteContext[hostIndex].vars.ROOT_URL;
      env.API_ROOT_URL = multisiteContext[hostIndex].vars.API_ROOT_URL;
    }
  }

  return env;
};

export default getEnv;
