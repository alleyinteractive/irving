import { getValueFromMergedConfig } from './getValueFromMergedConfig';

describe('getValueFromMergedConfig', () => {
  const reducers = getValueFromMergedConfig('reducers', {});
  const sagas = getValueFromMergedConfig('sagas', []);
  const trailingSlashDenylist = getValueFromMergedConfig('trailingSlashDenylist', []);

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
});
