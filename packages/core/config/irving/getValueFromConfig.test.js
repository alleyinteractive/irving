import {
  getValueFromConfigNoMemo as getValueFromConfig,
} from './getValueFromConfig';

describe('getValueFromConfig', () => {
  const reducers = getValueFromConfig('reducers', {});
  const sagas = getValueFromConfig('sagas', []);
  const trailingSlashDenylist = getValueFromConfig('trailingSlashDenylist', []);

  it(
    'should merge both config object or array and a function returning config object or array, from pacakges and user',
    () => {
      expect(Object.keys(reducers)).toEqual([
        'packageSlice',
        'testSlice',
        'userSlice',
      ]);
      expect(trailingSlashDenylist).toEqual([
        '/do/not/trailing/slash/me',
      ]);
    }
  );

  it(
    'should run config functions only when asked for',
    () => {
      expect(sagas[0].payload.args[0]).toBe('TEST_ACTION_THREE');
    }
  );

  it(
    'should return different values across multiple calls if default value is different',
    () => {
      expect(getValueFromConfig(
        'trailingSlashDenylist',
        ['/another-test']
      )).toEqual([
        '/another-test',
        '/do/not/trailing/slash/me',
      ]);
    }
  );
});
