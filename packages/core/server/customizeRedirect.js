const expressNakedRedirect = require('express-naked-redirect');
const getConfigField = require('../utils/getConfigField');

module.exports = function () {
  const config = getConfigField('customizeRedirect');

  // Move on if not config is added.
  if (Object.keys(config).length === 0) {
    return function (req, res, next) {
      return next();
    };
  }

  return expressNakedRedirect(config);
};
