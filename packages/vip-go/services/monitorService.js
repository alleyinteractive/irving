/**
 * Get the reusable monitor service instance. This service implements basic
 * application monitoring. It currently relies on newrelic, but the interface
 * is simple enough to be used with other underlying services if necessary.
 *
 * @returns {object} singleton service object
 */
const getService = () => {
  const configured = [
    'NEW_RELIC_APP_NAME',
    'NEW_RELIC_LICENSE_KEY',
  ].every((field) => ('undefined' !== typeof process.env[field]));

  if (! configured) {
    return false;
  }

  // newrelic cannot be imported in a browser environment.
  if (! process.env.BROWSER) {
    let irvingNewrelic;
    // Check if optional newrelic client is installed.
    try {
      const { newrelic, logger } = require('@automattic/vip-go'); // eslint-disable-line global-require
      irvingNewrelic = newrelic({
        logger: logger('irving:newrelic'),
      });
    } catch (err) {
      return false;
    }

    return {
      start: () => {}, // Simply requiring the newrelic module starts the service.
      logError(err) {
        irvingNewrelic.noticeError(err);
      },
      logTransaction(method, status, category) {
        irvingNewrelic.setTransactionName(`${method} ${status} ${category}`);
      },
    };
  }

  return false;
};

module.exports = getService;
