const defaultService = require(
  '@irvingjs/core/services/logService/defaultService'
);
const getEnv = require('@irvingjs/core/utils/universalEnv');

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
  const {
    NODE_ENV: env,
    SENTRY_DSN,
  } = getEnv();
  let service = defaultService;

  /* eslint-disable global-require */
  // This is still required for log service, as core expects the log service to be isomorphic.
  if (
    ! process.env.IRVING_EXECUTION_CONTEXT ||
    'production_server' === process.env.IRVING_EXECUTION_CONTEXT ||
    'development_server' === process.env.IRVING_EXECUTION_CONTEXT
  ) {
    const { format } = require('winston');
    let transport;

    // Set up sentry transport.
    if (SENTRY_DSN) {
      const SentryTransport = require('winston-transport-sentry-node').default;
      const sentryFormat = format((info) => {
        const { app_type, ...extra } = info;

        return {
          ...extra,
          tags: {
            source: app_type,
          },
        };
      });

      transport = new SentryTransport({
        sentry: {
          dsn: SENTRY_DSN
        },
        environment: env,
        format: sentryFormat(),
        level: 'warn', // only log at warn and above.
      });
    }

    // Set up the logger.
    const { logger } = require('@automattic/vip-go');
    const log = logger(namespace, {
      silent: 'test' === env,
      transport,
    });

    // Map log levels to winston log levels in node.
    service = Object.keys(defaultService)
      .reduce((acc, method) => {
        acc[method] = (...messages) => {
          messages.forEach((message) => {
            if ('error' === method && 'development' === env) {
              // In development the app should crash fast when encountering any errors.
              // throw message;
              console.log(message);
            }
          });

          log[method](...messages);
        };

        return acc;
      }, {});
  }
  /* eslint-enable */

  return service;
};

module.exports = getService;
