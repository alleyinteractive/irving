const getValueFromFiles = require('../config/irving/getValueFromFiles');
const { NODE_ENV } = process.env;
const config = getValueFromFiles(
  'config/redirect.js',
  {}
);

const customizeRedirect = (req, res, next) => {
  const hasConfig = !! Object.keys(config).length;
  const isDev = 'development' === NODE_ENV;

  /**
   * Move on if:
   * - no config was added
   * - in a dev environment
   */
  if (! hasConfig || isDev) {
    return next();
  }

  const {
    host,
    protocol,
    https,
    subDomain,
    reverse,
  } = config;
  const requestHost = req.hostname;
  const requestProtocol = req.get('x-forwarded-proto') || req.protocol;
  // Fall back to request host if none configured.
  let targetHost = (host || requestHost);
  // Fall back to request protocol if none configured.
  const targetProtocol = protocol || requestProtocol;

  // check host.
  let redirectHost = host !== requestHost;

  // check protocol.
  const redirectProtocol = protocol !== requestProtocol ||
    (https && 'https' !== requestProtocol);

  // redirect naked to subdomain (default www).
  if (! reverse && subDomain && ! requestHost.includes(subDomain)) {
    targetHost = `${subDomain}.${targetHost}`;
    redirectHost = true;
  }

  // redirect subdomain to naked.
  if (reverse && subDomain && requestHost.includes(subDomain)) {
    targetHost.replace(`${subDomain}.`, '');
    redirectHost = true;
  }

  // perform redirect.
  if (redirectHost || redirectProtocol) {
    return res.redirect([`${targetProtocol}://${targetHost}`, req.url].join(''));
  }

  next();
};

module.exports = customizeRedirect;
