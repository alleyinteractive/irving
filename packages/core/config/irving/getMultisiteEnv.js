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

// If a configuration exists, ensure no site config appears twice.
const config = 0 === multisiteConfig.length ? null :
  uniq(multisiteConfig, 'domain').flat();
/* eslint-enable */

/**
 * A utility function that replaces the `ROOT_URL` and `API_ROOT_URL` values
 * in the process.env object.
 * @param {string} hostname - The hostname to search for.
 * @returns {object} The (possibly) modified environment configuration.
 */
module.exports = (hostname) => {
  const modifiedEnv = process.env;

  if (config) {
    const hostIndex = config.findIndex(
      (site) => site.domain === hostname
    );
    const matchedRoot = (
      - 1 < hostIndex &&
      config[hostIndex].vars.ROOT_URL === process.env.ROOT_URL
    );

    // Only overwrite the process variable if the host exists and the host's
    // `ROOT_URL` var does not match the currently set env `ROOT_URL` value.
    if (! matchedRoot) {
      // Replace vars with those at the current host index.
      modifiedEnv.ROOT_URL = config[hostIndex].vars.ROOT_URL;
      modifiedEnv.API_ROOT_URL = config[hostIndex].vars.API_ROOT_URL;
    }
  }

  return modifiedEnv;
};
