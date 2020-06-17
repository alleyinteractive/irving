const expressNakedRedirect = require('express-naked-redirect');
const { getValueFromMergedConfig } = require('../config/irving/getValueFromMergedConfig');
const {
  NODE_ENV,
  ROOT_URL,
} = process.env;

const customizeRedirect = () => {
  const config = getValueFromMergedConfig('customizeRedirect', {});

  return (req, res, next) => {
    /**
     * Move on if:
     * - no config was added
     * - current request is not for the configured ROOT_URL
     * - in a dev environment
     */
    if (
      ! ROOT_URL.includes(req.headers.host) ||
      0 === Object.keys(config).length ||
      'development' === NODE_ENV
    ) {
      return next();
    }

    return expressNakedRedirect(config)(req, res, next);
  };
};

module.exports = customizeRedirect;
