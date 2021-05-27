/* eslint-disable max-len, global-require */
const IoredisMock = require('ioredis-mock');

/**
 * Test redis database.
 */
const mockRedisDatabase = {
  'components-endpoint:https://irving-multisite.test/api/components?path=/&context=site': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-page&context=site': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-page&context=site&extra-parameter=2': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-page&context=site&extra-parameter=3': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-article&context=site': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-article/&context=site': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-term&context=site': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-term&context=site&another-param': 'data',
  'components-endpoint:https://irving-multisite.test/api/components?path=/test-test-test': 'data',
  // 'components-endpoint:https://irving-multisite.test/api/components?path=/cache&context=page': 'data',
};
/* eslint-enable max-len */

// This is all very odd, see https://github.com/stipsan/ioredis-mock/issues/568#issuecomment-613833998
jest.mock('ioredis', () => {
  const Redis = require('ioredis-mock');

  if ('object' === typeof Redis) {
    // the first mock is an ioredis shim because ioredis-mock depends on it
    // https://github.com/stipsan/ioredis-mock/blob/master/src/index.js#L101-L111
    return {
      Command: { _transformer: { argument: {}, reply: {} } },
    };
  }

  return Redis;
});

module.exports = function Redis() {
  return new IoredisMock({
    data: mockRedisDatabase,
  });
};
