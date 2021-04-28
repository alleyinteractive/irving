const defaultService = require('./defaultService')();
let service;

/**
 * Get the reusable monitor service instance. This service implements basic
 * application monitoring. It currently relies on newrelic, but the interface
 * is simple enough to be used with other underlying services if necessary.
 *
 * @returns {object} singleton service object
 */
const getService = () => {
  // Memoize service, so it can reused.
  if (service) {
    return service;
  }

  const configured = [
    'NEW_RELIC_APP_NAME',
    'NEW_RELIC_LICENSE_KEY',
  ].every((field) => ('undefined' !== typeof process.env[field]));

  if (! configured) {
    return defaultService;
  }

  let newrelic;
  // Check if optional newrelic client is installed.
  try {
    newrelic = require('newrelic'); // eslint-disable-line global-require
  } catch (err) {
    return defaultService;
  }

  service = {
    start: () => {}, // Simply requiring the newrelic module starts the service.
    logError(err) {
      newrelic.noticeError(err);
    },
    logTransaction(method, status, category) {
      newrelic.setTransactionName(`${method} ${status} ${category}`);
    },
    logMessage: () => {},
  };

  return service;
};

module.exports = getService;
