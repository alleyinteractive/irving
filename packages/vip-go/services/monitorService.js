const defaultService = require(
  '@irvingjs/core/services/monitorService/defaultService'
)();

/**
 * Get the reusable monitor service instance. This service implements basic
 * application monitoring. It currently relies on newrelic, but the interface
 * is simple enough to be used with other underlying services if necessary.
 *
 * @returns {object} singleton service object
 */
const getService = () => {
  // Attempt to create newrelic client using vip go package.
  try {
    const { newrelic, logger } = require('@automattic/vip-go'); // eslint-disable-line global-require
    const client = newrelic({
      logger: logger('irving:newrelic'),
    });

    // VIP Go's package can return nothing if newrelic is not instsalled or configured improperly.
    if (! client) {
      return defaultService;
    }

    return {
      client,
      start: () => {},
      logError(err) {
        client.noticeError(err);
      },
      logTransaction(method, status, category) {
        client.setTransactionName(`${method} ${status} ${category}`);
      },
    };
  } catch (err) {
    return defaultService;
  }
};

module.exports = getService;
