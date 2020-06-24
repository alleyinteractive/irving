import mock from 'mock-fs';
import { buildContext } from '../paths';
import getValueFromFiles from './getValueFromFiles';
import createMock from '../../__mocks__/fsConfig';

jest.mock('../../utils/nodeRequire.js');

describe('getValueFromFiles', () => {
  beforeEach(createMock);
  afterEach(mock.restore);

  it('should return only a user module if default is a single function', () => {
    const configValue = getValueFromFiles('test-function.js', () => {}, { base: buildContext });
    expect(configValue.toString()).toEqual('() => { \'this is a test\' }');
  });

  it('should merge objects from user and package files', () => {
    const configValue = getValueFromFiles('test.js', {}, { base: buildContext });
    expect(configValue).toEqual({
      field: 'test two',
      fieldTwo: 'another test',
    });
  });
});
