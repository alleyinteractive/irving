import { takeLatest, takeEvery } from 'redux-saga/effects';
import { getConfigArray, getConfigObject } from './getConfigValue';

jest.mock('../irving.config.js');

describe('getConfigValue', () => {
  const reducers = getConfigObject('reducers');
  const sagas = getConfigArray('sagas');
  const proxyPassthrough = getConfigArray('proxyPassthrough');

  it(
    'should merge both config object or array and a function returning config object or array, from pacakges and user',
    () => {
      expect(Object.keys(reducers)).toEqual([
        'packageSlice',
        'testSlice',
        'userSlice',
      ]);
      expect(proxyPassthrough).toEqual([
        '/test/**/*',
        '/test-two/**/*',
      ]);
    }
  );

  it(
    'should run config functions only when asked for',
    () => {
      expect(sagas[0].payload.args[0]).toBe('TEST_ACTION');
    }
  );
});
