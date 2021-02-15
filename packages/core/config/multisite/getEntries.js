const { multisiteConfig } = require('./getSiteConfig');

/**
 * Get site-specific entry points for all sites.
 *
 * @param {string} hostname - The hostname to search for.
 * @returns {object} object of site-specific entry points.
 */
module.exports = () => (
  multisiteConfig
    .map((config) => config.entry || {})
    .reduce((acc, siteEntries) => ({
      ...acc,
      ...siteEntries,
    }), {})
);
