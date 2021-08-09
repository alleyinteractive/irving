const defaultService = require(
  '@irvingjs/core/services/logService/defaultService',
);
const getEnv = require('@irvingjs/core/utils/universalEnv');
const monitor = require('@irvingjs/core/services/monitorService/getService')();
const SentryReact = require('@sentry/react');
const generateLogInfo = require('./generateLogInfo');

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
  let service = defaultService;
  let Sentry;

  const {
    ROOT_URL,
    NODE_ENV,
    IRVING_APP_ENVIRONMENT,
    IRVING_RENDER_ERRORS,
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
  } = getEnv();

  // /* eslint-disable global-require */
  if (
    !process.env.IRVING_EXECUTION_CONTEXT
    || process.env.IRVING_EXECUTION_CONTEXT === 'production_server'
    || process.env.IRVING_EXECUTION_CONTEXT === 'development_server'
  ) {
    Sentry = require('@sentry/node');
  } else {
    Sentry = SentryReact;
  }

  Sentry.init({
    dsn: 'https://a51b194a39f84d26848eff7cc169f089@o576571.ingest.sentry.io/5730320',
    environment: 'JUSTIN_IRVING_LOCAL',
    // integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    // tracesSampleRate: 1.0,
  });

  // Map log levels to winston log levels in node.
  service = Object.keys(defaultService)
    .reduce((acc, method) => {
      acc[method] = (...messages) => {
        // Construct log info object and send it to winston.
        const logInfo = generateLogInfo(method, messages);
        // console.log('>>>>>>>>');
        // console.log(logInfo);
        // log[method](logInfo);

        // If we have an error, do a couple more things with it.
        if (logInfo.level === 'error') {
          const err = new Error(logInfo.message);

          Sentry.withScope((scope) => {
            scope.setLevel('error');
            Sentry.captureException(err);
          });

          // if (NODE_ENV === 'development' && !IRVING_RENDER_ERRORS) {
          //   // In development the app should crash fast when encountering any errors.
          //   throw err;
          // }

          // Send error to production monitoring service.
          if (NODE_ENV === 'production') {
            monitor.logError(err);
          }
        }
      };
      return acc;
    }, {});
  /* eslint-enable */

  return service;
};

module.exports = getService;
