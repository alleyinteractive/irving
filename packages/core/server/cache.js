const auth = require('basic-auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const purgeCache = require('./purgeCache');
const getCacheKeys = require('./getCacheKeys');
const createCheckAuth = require('./auth');

const {
  API_ROOT_URL,
  API_ORIGIN,
  BASIC_AUTH_USERNAME: username,
  BASIC_AUTH_PASSWORD: password,
} = process.env;

const corsMiddleware = cors({
  origin: (origin, callback) => {
    console.log(origin);
    if (
      origin &&
      (API_ROOT_URL.includes(origin) || API_ORIGIN === origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // IE11 will choke on 204.
});

const cacheProtectionMiddleware = (req, res, next) => {
  const user = auth(req);

  // If basic auth doesn't exist or isn't valid, pass along to cors middleware.
  if (
    ! username ||
    ! password ||
    ! user ||
    user.name !== username ||
    user.pass !== password
  ) {
    corsMiddleware(req, res, next);
  }

  // Allow endpoints if basic auth passes.
  return next();
};

const cacheMiddleware = (app) => {
  // Clearing the Redis cache.
  app.post(
    '/purge-cache',
    bodyParser.json(),
    cacheProtectionMiddleware,
    purgeCache
  );

  app.get('/cache-keys', createCheckAuth('cache'), getCacheKeys);
};

module.exports = cacheMiddleware;
