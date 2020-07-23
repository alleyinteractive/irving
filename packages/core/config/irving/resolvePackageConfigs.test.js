import mock from 'mock-fs';
import path from 'path';
import { buildContext } from '../paths';
import resolvePackageConfigs from './resolvePackageConfigs';
import createMock from '../../__mocks__/fsConfig';

describe('resolvePackageConfigs', () => {
  beforeEach(createMock);
  afterEach(mock.restore);

  it('should return filepaths for provided config file sourced from irving packages', () => {
    const modules = resolvePackageConfigs('test.js', { base: buildContext });
    const base = path.join(__dirname, '../../');

    expect(modules).toEqual([
      `${base}node_modules/@irvingjs/test-package/test.js`,
      `${base}node_modules/@irvingjs/test-package-two/test.js`,
      `${base}node_modules/@irvingjs/test-package-three/test.js`,
    ]);
  });
});
