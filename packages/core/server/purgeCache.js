const get = require('lodash/fp/get');
const chalk = require('chalk');
const queryString = require('query-string');
const getService = require('../services/logService');
const cacheService = require('../services/cacheService')();

const log = getService('irving:cache:purge');

/**
 * Turn a fully-qualified URL into a key for cache purging.
 *
 * @param {string} path URL to transform
 * @returns {string} Path to be used as a redis key.
 */
const createKeyFromPath = (path) => {
  if (! path) {
    return false;
  }

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
 * @param {object} req  Request object.
 * @param {object} res  Response object.
 * @returns {*}
 */
const purgeCache = async (req, res) => {
  const paths = get('paths', req.body) || [];
  const pipeline = cacheService.client.pipeline();
  const completeMessage = 'Cache purge successful!';

  // Create a readable stream (object mode).
  // This approach is better for performance.
  if (paths.length) {
    Promise.all(
      paths.map(async (path) => (
        executeStream(pipeline, res, createKeyFromPath(path))
      ))
    ).then(() => {
      pipeline.exec();
      log.info(completeMessage);
      res.write(completeMessage);
      return res.end();
    }).catch(
      (e) => console.log(chalk.red(e)) // eslint-disable-line no-console
    );
  } else {
    await executeStream(pipeline, res);
    pipeline.exec();
    log.info(completeMessage);
    res.write(completeMessage);
    return res.end();
  }
};

module.exports = purgeCache;
