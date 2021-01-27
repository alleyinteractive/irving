const auth = require('basic-auth');
const { getEnv } = require('../config/multisite');

/**
 * A middleware that will force Basic Auth if related environment variables are set.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {*}
 */
const createCheckAuth = (realm, passthrough = true) => (req, res, next) => {
  const hasFallback = 'function' === typeof passthrough;
  const {
    BASIC_AUTH_USERNAME: username,
    BASIC_AUTH_PASSWORD: password,
  } = getEnv(req.hostname);

  if (! username || ! password) {
    if (! passthrough) {
      return res.status(401).send();
    }

    if (! hasFallback) {
      return next();
    }
  }

  const user = auth(req);
  if (! user || user.name !== username || user.pass !== password) {
    if (hasFallback) {
      return passthrough(req, res, next);
    }

    res.set('WWW-Authenticate', `Basic realm="${realm}"`);
    return res.status(401).send();
  }

  return next();
};

module.exports = createCheckAuth;
