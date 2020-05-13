const get = require('lodash/fp/get');
const queryString = require('query-string');
const cacheService = require('../services/cacheService')();

/**
 * Turn a fully-qualified URL into a key for cache purging.
 *
 * @param {string} url URL to transform
 * @returns {string} Path to be used as a redis key.
 */
const createKeyFromUrl = (url) => {
  if (! url) {
    return false;
  }

  const path = url.replace(process.env.ROOT_URL, '');
  const normalizedPath = [...path].reduce(
    (acc, letter, idx) => {
      // Normalize to include preceeding slash.
      if (0 === idx && '/' !== letter) {
        return `/${acc}`;
      }

      // Remove trailing slash to prevent mismatched keys
      if (
        1 !== path.length &&
        path.length - 1 === idx &&
        '/' === letter
      ) {
        return acc;
      }

      return `${acc}${letter}`;
    },
    ''
  );

  // Return exact match if path is "/".
  if ('/' === normalizedPath) {
    const endpoint = queryString.stringify(
      {
        path: normalizedPath,
        context: 'site',
      },
      {
        encode: false,
        sort: false,
      }
    );

    return `components-endpoint:${endpoint}`;
  }

  const endpoint = queryString.stringify(
    { path: normalizedPath },
    { encode: false }
  );

  return `components-endpoint:${endpoint}*`;
};

/**
 * Bust the entire cache from Redis.
 *
 * @param {string} key Base path to use for purging keys.
 * @returns {Promise}
 */
const executeStream = async (key = '') => {
  const stream = await cacheService.client.scanStream({
    match: key,
  });

  return new Promise((resolve) => {
    let keysDeleted = 0;

    stream.on('data', async (keys) => {
      // `keys` is an array of strings representing key names
      if (keys.length) {
        const pipeline = cacheService.client.pipeline();
        keysDeleted += keys.length;

        keys.forEach((foundKey) => {
          pipeline.del(foundKey);
        });
        pipeline.exec();
      }
    });

    stream.on('end', () => {
      const keyMessage = key ? ` for key ${key}` : '';

      if (0 === keysDeleted) {
        resolve(`No keys matched${keyMessage}`);
      }

      resolve(`matched ${keysDeleted} keys${keyMessage}`);
    });
  });
};

/**
 * Bust the entire cache or cache for a specific set of URLs from Redis.
 *
 * @param {object} req  Request object.
 * @param {object} res  Response object.
 * @returns {*}
 */
const purgeCache = async (req, res) => {
  const urls = get('urls', req.body) || [];

  // Create a readable stream (object mode).
  // This approach is better for performance.
  if (urls.length) {
    Promise.all(
      urls.map(async (url) => (
        executeStream(createKeyFromUrl(url))
      ))
    ).then((values) => {
      res.write('Cache purge successful: ');

      values.forEach((value) => {
        res.write(value);
      });

      res.end();
    });

    return;
  }

  const response = await executeStream();
  res.send(`Cache purge successful: ${response}`);
};

module.exports = purgeCache;
