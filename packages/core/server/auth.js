const auth = require('basic-auth');

const {
  BASIC_AUTH_USERNAME: username,
  BASIC_AUTH_PASSWORD: password,
} = process.env;

/**
 * A middleware that will force Basic Auth if related environment variables are set.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {*}
 */
const createCheckAuth = (realm) => (req, res, next) => {
  if (! username || ! password) {
    return next();
  }

  const user = auth(req);
  if (! user || user.name !== username || user.pass !== password) {
    res.set('WWW-Authenticate', `Basic realm="${realm}"`);
    return res.status(401).send();
  }

  return next();
};

module.exports = createCheckAuth;
