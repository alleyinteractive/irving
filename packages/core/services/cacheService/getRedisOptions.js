const isRedisUrl = require('./isRedisUrl');

const getRedisOptions = () => {
  const hostAndPort = process.env.REDIS_MASTER || process.env.REDIS_URL || '';
  const password = process.env.REDIS_PASSWORD || null;

  // Return URLS with a redis protocol as-is.
  if (isRedisUrl(hostAndPort)) {
    return [hostAndPort];
  }

  const [host, port] = hostAndPort.split(':');

  return [host, port, password];
};

module.exports = getRedisOptions;
