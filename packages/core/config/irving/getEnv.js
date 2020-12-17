const uniq = require('lodash/uniq');
let multisiteConfig;

/* eslint-disable global-require, import/no-dynamic-require */
if (process.env.IRVING_EXECUTION_CONTEXT) {
  multisiteConfig = require('@irvingjs/multisite.config');
} else {
  const { maybeResolveBuildModule } = require('../../utils/userModule');
  multisiteConfig = require(
    maybeResolveBuildModule('multisite.config.js')
  );
}
/* eslint-enable */

// If a configuration exists, ensure no site config appears twice.
const config = multisiteConfig.length ?
  uniq(multisiteConfig, 'domain').flat() :
  [];

/**
 * A utility function that replaces the `ROOT_URL` and `API_ROOT_URL` values
 * in the process.env object.
 * @param {string} hostname - The hostname to search for.
 * @returns {object} env object, with site-specific values if available.
 */
module.exports = (hostname = window.location.hostname) => {
  const env = Object.keys(process.env).length ? process.env : window.__ENV__; // eslint-disable-line no-underscore-dangle
  const hostIndex = config.findIndex(
    (site) => site.domain === hostname
  );

  if (- 1 === hostIndex) {
    return env;
  }

  const multisiteEnv = {
    ...env,
    ...config[hostIndex].vars,
  };

  return multisiteEnv;
};
