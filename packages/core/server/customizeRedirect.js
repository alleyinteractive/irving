const getValueFromFiles = require('../config/irving/getValueFromFiles');
const { NODE_ENV } = process.env;
const config = getValueFromFiles(
  'config/redirect.js',
  {
    https: true,
    subDomain: 'www',
    reverse: true,
  }
);

console.log(config);

/**
 * Generate a URL to which express should redirect.
 *
 * @param {object} req Express request object.
 * @param {object} redirectConfig Redirect configuration settings.
 * @return {string|null} URL to redirect to, if app should redirect.
 */
const getRedirect = (req, redirectConfig) => {
  const {
    host,
    protocol,
    https,
    subDomain,
    reverse,
  } = redirectConfig;
  const requestHost = req.hostname;
  const requestProtocol = req.get('x-forwarded-proto') || req.protocol;
  // Fall back to request host if none configured.
  let targetHost = requestHost;
  // Fall back to request protocol if none configured.
  let targetProtocol = requestProtocol;

  // check protocol.
  let redirectProtocol = false;
  if ((protocol && protocol !== requestProtocol)) {
    // redirect to custom protocol.
    targetProtocol = protocol;
    redirectProtocol = true;
  } else if (https && 'https' !== requestProtocol) {
    // Redirect http to https.
    targetProtocol = 'https';
    redirectProtocol = true;
  }

  // check host.
  let redirectHost = false;
  if (host && host !== requestHost) {
    targetHost = host;
    redirectHost = true;
  } else if (! reverse && subDomain && ! requestHost.includes(subDomain)) {
    // redirect naked to subdomain (default www).
    targetHost = `${subDomain}.${targetHost}`;
    redirectHost = true;
  } else if (reverse && subDomain && requestHost.includes(subDomain)) {
    // redirect subdomain to naked.
    targetHost = targetHost.replace(`${subDomain}.`, '');
    redirectHost = true;
  }

  if (redirectHost || redirectProtocol) {
    return `${targetProtocol}://${targetHost}`;
  }

  return null;
};

/**
 * Express middleware to redirect based on configuration.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Middleware callback.
 * @return {void};
 */
const customizeRedirect = (req, res, next) => {
  const hasConfig = !! Object.keys(config).length;
  const isDev = 'development' === NODE_ENV;

  /**
   * Move on if:
   * - no config was added
   * - in a dev environment
   */
  // if (! hasConfig || isDev) {
  //   return next();
  // }

  const redirect = getRedirect(req, config);

  console.log(redirect);

  // perform redirect.
  if (redirect) {
    return res.redirect([redirect, req.url].join(''));
  }

  next();
};

module.exports = {
  getRedirect,
  customizeRedirect,
};
