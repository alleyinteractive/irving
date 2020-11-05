const bodyParser = require('body-parser');
const cors = require('cors');
const purgeCache = require('./purgeCache');
const getCacheKeys = require('./getCacheKeys');
const createCheckAuth = require('./auth');

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (
      origin &&
      (
        process.env.API_ROOT_URL.includes(origin) ||
        process.env.API_ORIGIN === origin
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // IE11 will choke on 204.
});

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
