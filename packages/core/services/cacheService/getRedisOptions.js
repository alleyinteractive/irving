const getRedisOptions = () => {
  const hostAndPort = process.env.REDIS_MASTER || process.env.REDIS_URL || '';
  const password = process.env.REDIS_PASSWORD || null;

  /**
   * Must be in the format host:port
   *
   * Possible examples:
   * - redis://h:pf11eaf6aa741db6178b99ecd801f27056d17358bd09caa6ffda775260b2d9a66@ec2-3-211-201-160.compute-1.amazonaws.com:11839
   * - 127.0.0.1:6379
   */
  const match = hostAndPort.match(
    /((redis:\/\/([\w]*:)?)?[\w.\-_@]+):([\d]+)/
  );

  if (! match) {
    return [];
  }

  const host = match[1];
  const port = match[4];

  return [host, port, password];
};

module.exports = getRedisOptions;
