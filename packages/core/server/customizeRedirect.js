const expressNakedRedirect = require('express-naked-redirect');
const getValueFromFiles = require('../config/irving/getValueFromFiles');
const {
  NODE_ENV,
  ROOT_URL,
} = process.env;
const config = getValueFromFiles(
  'server/customizeRedirect.js',
  {}
);

const customizeRedirect = () => (
  (req, res, next) => {
    /**
     * Move on if:
     * - no config was added
     * - current request is not for the configured ROOT_URL
     * - in a dev environment
     *
     * @todo determine if this first condition is even necessary anymore, or just an edge case we don't need to account for
     */
    if (
      ! ROOT_URL.includes(req.headers.host) ||
      0 === Object.keys(config).length ||
      'development' === NODE_ENV
    ) {
      return next();
    }

    return expressNakedRedirect(config)(req, res, next);
  }
);

module.exports = customizeRedirect;
