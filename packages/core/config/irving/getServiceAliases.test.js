import mock from 'mock-fs';
import path from 'path';
import getServiceAliases from './getServiceAliases';
import createMock from '../../__mocks__/fsConfig';

jest.mock('../../utils/nodeRequire.js');

describe('getValueFromFiles', () => {
  beforeEach(createMock);
  afterEach(mock.restore);

  it('should return an object of aliases for each config field, using defaultServices as fallbacks for a web target', () => {
    const aliases = getServiceAliases('web');

    expect(aliases).toEqual({
      '@irvingjs/services/cacheClient': path.join(
        process.cwd(),
        'services/cacheService/defaultCacheClient.js'
      ),
      '@irvingjs/services/cacheService': path.join(
        process.cwd(),
        'services/cacheService/defaultService.js'
      ),
      '@irvingjs/services/logService': path.join(
        process.cwd(),
        'node_modules/@irvingjs/test-package-two/services/logService.js'
      ),
      '@irvingjs/services/monitorService': path.join(
        process.cwd(),
        'services/monitorService/defaultService.js'
      ),
    });
  });

  it('should return an object of aliases for each config field, using core services as a fallback in a node target', () => {
    const aliases = getServiceAliases('node');

    expect(aliases).toEqual({
      '@irvingjs/services/cacheClient': path.join(
        process.cwd(),
        'services/cacheService/cacheClient.js'
      ),
      '@irvingjs/services/cacheService': path.join(
        process.cwd(),
        'node_modules/@irvingjs/test-package/services/cacheService.js'
      ),
      '@irvingjs/services/logService': path.join(
        process.cwd(),
        'node_modules/@irvingjs/test-package-two/services/logService.js'
      ),
      '@irvingjs/services/monitorService': path.join(
        process.cwd(),
        'services/monitorService/index.js'
      ),
    });
  });
});
