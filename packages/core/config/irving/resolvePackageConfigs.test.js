import mock from 'mock-fs';
import { buildContext } from '../paths';
import resolvePackageConfigs from './resolvePackageConfigs';
import createMock from '../../__mocks__/fsConfig';

describe('resolvePackageConfigs', () => {
  beforeEach(createMock);
  afterEach(mock.restore);

  it('should return filepaths for provided config file sourced from irving packages', () => {
    const modules = resolvePackageConfigs('test.js', buildContext);

    expect(modules).toEqual([
      '/Users/owenstowe/broadway/www/irving/packages/core/node_modules/@irvingjs/test-package/test.js',
      '/Users/owenstowe/broadway/www/irving/packages/core/node_modules/@irvingjs/test-package-two/test.js',
    ]);
  });
});
