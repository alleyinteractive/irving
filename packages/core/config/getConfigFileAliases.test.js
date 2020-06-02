import mock from 'mock-fs';
import path from 'path';
import getConfigFileAliases from './getConfigFileAliases';
import createMock from '../__mocks__/fsConfig';

jest.mock('../utils/nodeRequire.js');

describe('getConfigFromFiles', () => {
  beforeEach(createMock);
  afterEach(mock.restore);

  it('should return an object of aliases for each config field', () => {
    const aliases = getConfigFileAliases();

    expect(aliases).toEqual({
      '@irvingjs/services/cacheClient': path.join(
        process.cwd(),
        'services/cacheService/getClient.js'
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
