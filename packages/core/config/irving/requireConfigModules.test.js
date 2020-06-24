import mock from 'mock-fs';
import { buildContext } from '../paths';
import requireConfigModules from './requireConfigModules';
import createMock from '../../__mocks__/fsConfig';

jest.mock('../../utils/nodeRequire.js');

describe('requireConfigModules', () => {
  beforeEach(createMock);
  afterEach(mock.restore);

  it('should read files from both packages and a user project', () => {
    const modules = requireConfigModules('test.js', buildContext);

    expect(modules).toEqual([
      { field: 'test' },
      { field: 'test two' },
      { fieldTwo: 'another test' },
    ]);
  });
});
