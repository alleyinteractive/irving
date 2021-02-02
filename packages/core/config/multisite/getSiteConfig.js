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
 * Get config for a specific site/hostname.
 *
 * @param {string} hostname - The hostname to search for.
 * @returns {object} site-specific config object.
 */
module.exports.getSiteConfig = (hostname = window.location.hostname) => (
  config.find(
    (site) => {
      const { domain } = site;
      if (Array.isArray(domain)) {
        return domain.includes(hostname);
      }

      return domain === hostname;
    }
  ) || {} // Return an empty object as a fallback/default.
);

module.exports.multisiteConfig = config;
