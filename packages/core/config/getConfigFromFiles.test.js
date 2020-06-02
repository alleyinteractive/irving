import mock from 'mock-fs';
import { buildContext } from './paths';
import getConfigFromFiles from './getConfigFromFiles';
import createMock from '../__mocks__/fsConfig';

jest.mock('../utils/nodeRequire.js');

describe('getConfigFromFiles', () => {
  beforeEach(createMock);
  afterEach(mock.restore);

  it('should return only a user module if default is a single function', () => {
    const configValue = getConfigFromFiles('test-function.js', buildContext, () => {});
    expect(configValue.toString()).toEqual('() => { \'this is a test\' }');
  });

  it('should merge objects from user and package files', () => {
    const configValue = getConfigFromFiles('test.js', buildContext, {});
    expect(configValue).toEqual({
      field: 'test two',
      fieldTwo: 'another test',
    });
  });
});
