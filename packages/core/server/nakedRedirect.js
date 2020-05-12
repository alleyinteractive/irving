const getConfigField = require('../utils/getConfigField');

const nakedRedirect = (req, res, next) => {
  const nakedRedirectConfig = getConfigField('nakedRedirect');

  if (nakedRedirectConfig) {
    let expressNakedRedirect;
    try {
      // Require the package.
      expressNakedRedirect = require('express-naked-redirect'); // eslint-disable-line global-require

      // Only load this package if used.
      if (nakedRedirectConfig.except) {
        require('url-pattern'); // eslint-disable-line global-require
      }
    } catch (err) {
      expressNakedRedirect = null;
    }

    if (expressNakedRedirect) {
      return expressNakedRedirect(nakedRedirectConfig);
    }
  }

  return next();
};

module.exports = nakedRedirect;
