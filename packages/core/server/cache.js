const bodyParser = require('body-parser');
const cors = require('cors');
const purgeCache = require('./purgeCache');
const getCacheKeys = require('./getCacheKeys');
const createCheckAuth = require('./auth');
const { getEnv } = require('../config/multisite');

// Necessary to wrap this to get the request (and hostname) in scope.
const corsMiddleware = (req, res, next) => {
  cors({
    origin: (origin, callback) => {
      const {
        API_ROOT_URL,
        API_ORIGIN,
      } = getEnv(req.hostname);

      if (
        origin &&
        (
          API_ROOT_URL.includes(origin) ||
          API_ORIGIN === origin
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200, // IE11 will choke on 204.
  })(req, res, next);
};

const cacheMiddleware = (app) => {
  // Clearing the Redis cache.
  app.post(
    '/purge-cache',
    bodyParser.json(),
    createCheckAuth('cache', corsMiddleware),
    purgeCache
  );

  app.get(
    '/cache-keys',
    createCheckAuth('cache', false),
    getCacheKeys
  );
};

module.exports = cacheMiddleware;
