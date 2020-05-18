const expressNakedRedirect = require('express-naked-redirect');
const getConfigField = require('../utils/getConfigField');
const {
  ROOT_URL,
} = process.env;

module.exports = function () {
  const config = getConfigField('customizeRedirect');

  return function (req, res, next) {
    // Move on if no config was added.
    if (Object.keys(config).length === 0) {
      return next();
    }

    // Confirm if request with the root url.
    if (!ROOT_URL.includes(req.headers.host)) {
      return next();
    } else {
      return expressNakedRedirect(config)(req, res, next);
    }
  };
};
