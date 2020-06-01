import mock from 'mock-fs';
import path from 'path';
import { buildContext } from './paths';
import { getConfigFromFiles, getConfigModules } from './getConfigFromFiles';

describe('getConfigFromFiles', () => {
  beforeEach(() => {
    mock({
      [path.join(process.cwd(), 'package.json')]: JSON.stringify({
        dependencies: {
          '@irvingjs/test-package': '0.0.0',
        },
      }),
      [path.join(process.cwd(), 'node_modules/@irvingjs/test-package/test.js')]:
        JSON.stringify({ field: 'test' }),
      [path.join(process.cwd(), 'test.js')]:
        JSON.stringify({ fieldTwo: 'another test' }),
      [path.join(process.cwd(), 'test-function.js')]:
        '() => { \'this is a test\' }',
    });
  });

  afterEach(mock.restore);

  it('should read files from both packages and a user project', () => {
    const modules = getConfigModules('test.js', buildContext);

    expect(modules).toEqual([
      { field: 'test' },
      { fieldTwo: 'another test' },
    ]);
  });

  it('should return only a user module if default is a single function', () => {
    const configValue = getConfigFromFiles('test-function.js', buildContext, () => {});
    expect(configValue.toString()).toEqual('() => { \'this is a test\' }');
  });

  it('should merge objects from user and package files', () => {
    const configValue = getConfigFromFiles('test.js', buildContext, {});
    expect(configValue).toEqual({
      field: 'test',
      fieldTwo: 'another test',
    });
  });
});
