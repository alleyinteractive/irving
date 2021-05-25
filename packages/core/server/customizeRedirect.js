const getValueFromFiles = require('../config/irving/getValueFromFiles');

const { NODE_ENV } = process.env;
const config = getValueFromFiles(
  'server/customizeRedirect.js',
  {
    https: true,
    subDomain: 'www',
    reverse: true,
  },
);

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

  // check protocol.
  const requestProtocol = req.get('x-forwarded-proto') || req.protocol;
  let redirectProtocol;
  let targetProtocol;
  switch (true) {
    // redirect to custom protocol.
    case (protocol && protocol !== requestProtocol):
      targetProtocol = protocol;
      redirectProtocol = true;
      break;

    // Redirect http to https.
    case (https && requestProtocol !== 'https'):
      targetProtocol = 'https';
      redirectProtocol = true;
      break;

    // Keep request protocol, no redirect necessary.
    default:
      targetProtocol = requestProtocol;
      redirectProtocol = false;
      break;
  }

  // check host.
  const requestHost = req.hostname;
  let redirectHost;
  let targetHost;
  switch (true) {
    // If custom host is set and not the same as the request host, use that as the redirect.
    case (host && host !== requestHost):
      targetHost = host;
      redirectHost = true;
      break;

    // redirect naked to subdomain (test.com -> www.test.com).
    case (!reverse && subDomain && !requestHost.includes(subDomain)):
      targetHost = `${subDomain}.${requestHost}`;
      redirectHost = true;
      break;

    // redirect subdomain to naked (www.test.com -> test.com).
    case (reverse && subDomain && requestHost.includes(subDomain)):
      targetHost = requestHost.replace(`${subDomain}.`, '');
      redirectHost = true;
      break;

    // Use original request host, no redirect necessary.
    default:
      targetHost = requestHost;
      redirectHost = false;
      break;
  }

  // If either host or protocol are marked as needing a redirect,
  // perform the redirect.
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
  const hasConfig = !!Object.keys(config).length;
  const isDev = NODE_ENV === 'development';

  /**
   * Move on if:
   * - no config was added
   * - in a dev environment
   */
  if (!hasConfig || isDev) {
    return next();
  }

  const redirect = getRedirect(req, config);

  // perform redirect.
  if (redirect) {
    return res.redirect([redirect, req.url].join(''));
  }

  return next();
};

module.exports = {
  getRedirect,
  customizeRedirect,
};
