const uniq = require('lodash/uniq');
let logService;
let multisiteConfig;

/* eslint-disable global-require, import/no-dynamic-require */
if (process.env.IRVING_EXECUTION_CONTEXT) {
  multisiteConfig = require('@irvingjs/multisite.config');
  logService = require('@irvingjs/services/logService');
} else {
  const { maybeResolveBuildModule } = require('../../utils/userModule');
  logService = require(
    '../../services/logService/getServiceFromFilesystem'
  );
  multisiteConfig = require(
    maybeResolveBuildModule('multisite.config.js')
  );
}
/* eslint-enable */

// Create logger
const log = logService('irving:env');

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
    log.info(
      'using default env: %o',
      {
        API_ROOT_URL: env.API_ROOT_URL,
        ROOT_URL: env.ROOT_URL,
      }
    );
    return env;
  }

  const multisiteEnv = {
    ...env,
    ...config[hostIndex].vars,
  };

  log.info(
    `using env for site ${hostname}: %o`,
    {
      API_ROOT_URL: multisiteEnv.API_ROOT_URL,
      ROOT_URL: multisiteEnv.ROOT_URL,
    }
  );

  return multisiteEnv;
};
