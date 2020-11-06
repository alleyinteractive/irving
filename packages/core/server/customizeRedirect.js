// const getValueFromFiles = require('../config/irving/getValueFromFiles');
const {
  NODE_ENV,
  ROOT_URL,
} = process.env;

// TODO: configure irving.config.js to serve this configuration object that
// sets the root host to redirect to and the protocol to enforce.
//
// const { redirectHost: config } = getValueFromFiles(
//   'irving.config.js',
//   {}
// );
//
// If the host does not exist, the function should exit per the customizeRedirect
// function below.
const config = {
  host: 'irving.alley.test',
  protocol: 'https',
};

const customizeRedirect = () => (
  (req, res, next) => {
    const hostMatch = ROOT_URL.includes(req.headers.host);
    const hasConfig = 0 !== Object.keys(config).length;
    const isDev = 'development' === NODE_ENV;

    /**
     * Move on if:
     * - current request is not for the configured ROOT_URL
     * - no config was added
     * - in a dev environment
     */
    if (! hostMatch || ! hasConfig || isDev) {
      return next();
    }

    const requestProtocol = req.headers['x-forwarded-proto'] || req.protocol;

    const {
      host,
      protocol,
    } = config;

    if (
      protocol !== requestProtocol ||
      host !== req.get('Host')
    ) {
      return res.redirect([`${protocol}://${host}`, req.url].join(''));
    }

    return res.redirect([`${requestProtocol}://${host}`, req.url].join(''));
  }
);

module.exports = customizeRedirect;
