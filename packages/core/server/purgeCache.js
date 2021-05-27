const get = require('lodash/fp/get');
const logService = require('../services/logService/getServiceFromFilesystem');
// This needs to be an es module, hence `.default`
const createEndpointUrl = require('../utils/endpoint/createEndpointUrl');
const { CONTEXT_SITE } = require('../config/constants');
const cacheService = require(
  '../services/cacheService/getServiceFromFilesystem',
)();

const log = logService('irving:cache:purge');

/**
 * Turn a fully-qualified URL into a key for cache purging.
 *
 * @param {string} hostname Current hostname.
 * @param {string} path URL to transform.
 * @returns {string} Path to be used as a redis key.
 */
const createKeyFromPath = (hostname, path) => {
  if (!path) {
    return false;
  }

  const normalizedPath = [...path].reduce(
    (acc, letter, idx) => {
      // Normalize to include preceeding slash.
      if (idx === 0 && letter !== '/') {
        return `/${acc}`;
      }

      // Remove trailing slash to prevent mismatched keys
      if (
        path.length !== 1
        && path.length - 1 === idx
        && letter === '/'
      ) {
        return acc;
      }

      return `${acc}${letter}`;
    },
    '',
  );

  // Return exact match if path is "/".
  if (normalizedPath === '/') {
    const endpoint = createEndpointUrl({
      hostname,
      path: normalizedPath,
      search: '',
      cookie: {},
      context: CONTEXT_SITE,
    });
    return `components-endpoint:${endpoint}`;
  }

  const endpoint = createEndpointUrl({
    hostname,
    path: normalizedPath,
    search: '',
    cookie: {},
    context: '',
  });
  return `components-endpoint:${endpoint}*`;
};

/**
 * Bust the entire cache from Redis.
 *
 * @param {string} key Base path to use for purging keys.
 * @returns {Promise}
 */
const executeStream = async (pipeline, res, key = '') => {
  const stream = await cacheService.client.scanStream({
    match: key,
  });
  const keyMessage = key ? ` for key ${key}` : '';
  let matches = 0;

  return new Promise((resolve, reject) => {
    stream.on('data', (keys) => {
      keys.forEach((foundKey) => {
        matches += 1;
        pipeline.del(foundKey);
      });
    });

    stream.on('error', (e) => {
      reject(e);
    });

    stream.on('end', () => {
      const message = `Purged ${matches} entries${keyMessage}`;
      log.info(message);
      res.write(`${message}\n`);
      resolve();
    });
  });
};

/**
 * Bust the entire cache or cache for a specific set of URLs from Redis.
 *
 * @param {object} req Request object.
 * @param {object} res Response object.
 * @returns {*}
 */
const purgeCache = async (req, res, next) => {
  if (!cacheService.client || !cacheService.client.pipeline) {
    return res.send('Redis client is not configured.');
  }

  const paths = get('paths', req.body) || [];
  const pipeline = cacheService.client.pipeline();
  const completeMessage = 'Cache purge successful!';

  // Create a readable stream (object mode).
  // This approach is better for performance.
  if (paths.length) {
    Promise.all(
      paths.map(async (path) => (
        executeStream(pipeline, res, createKeyFromPath(req.hostname, path))
      )),
    ).then(() => {
      pipeline.exec();
      log.info(completeMessage);
      res.write(completeMessage);
      return res.end();
    }).catch((e) => {
      log.error(e); // eslint-disable-line no-console
      return res.send(e);
    });
  } else {
    await executeStream(pipeline, res);
    pipeline.exec();
    log.info(completeMessage);
    res.write(completeMessage);
    return res.end();
  }

  return next();
};

module.exports = purgeCache;
