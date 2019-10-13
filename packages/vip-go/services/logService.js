const getMonitorService = require('./monitorService');
const monitor = getMonitorService();
/* eslint-disable no-console */
const defaultService = {
  emerg: console.error,
  alert: console.error,
  crit: console.error,
  error: console.error,
  warning: console.log,
  notice: console.log,
  info: console.info,
  debug: console.debug,
};
/* eslint-enable */

/**
 * Create a debug logger that will conditionally handle logged errors based on
 * the running environment type.
 *
 * @param {String} namespace  The namespace of the error. This is typically the
 *                            module, but the value can be more or less granular
 *                            if desired.
 * @return {function}         A logging function.
 */
const getService = (namespace) => {
  const env = process.env.NODE_ENV;
  let service;

  /* eslint-disable global-require */
  if (! process.env.BROWSER) {
    const { logger } = require('@automattic/vip-go');
    const log = logger(namespace, {
      silent: 'test' === env,
    });

    // Map log levels to winston log levels in node.
    service = Object.keys(defaultService)
      .reduce((acc, method) => {
        acc[method] = (...messages) => {
          // Send error to production monitoring service.
          if ('production' === env) {
            monitor.logError();
          }

          log[method](...messages);
        };

        return acc;
      }, {});
  }
  /* eslint-enable */

  return service;
};

module.exports = getService;
