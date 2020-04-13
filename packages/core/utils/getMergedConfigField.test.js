import { takeLatest, takeEvery } from 'redux-saga/effects';
import { getMergedFromUserConfig } from './getMergedConfigField';

describe('getMergedFromUserConfig', () => {
  it('should get provided field from configured packages of both object and array types', () => {
    const mockConfig = {
      packages: [
        {
          reducers: () => ({
            mySlice: () => {},
          }),
          sagas: () => ([
            takeLatest('TEST_ACTION', () => {}),
          ]),
        },
      ],
    };
    const configReducers = getMergedFromUserConfig(mockConfig, 'reducers');
    const configSagas = getMergedFromUserConfig(mockConfig, 'sagas');
    const reducers = configReducers[0]();
    const sagas = configSagas[0]();

    expect(Object.keys(reducers)).toEqual(['mySlice']);
    expect(sagas[0].payload.args[0]).toBe('TEST_ACTION');
  });

  it('should get user-configured config data of both object and array types',
    () => {
      const mockConfig = {
        reducers: () => ({
          userSlice: () => {},
        }),
        sagas: () => ([
          takeLatest('TEST_ACTION', () => {}),
        ]),
      };
      const configReducers = getMergedFromUserConfig(mockConfig, 'reducers');
      const configSagas = getMergedFromUserConfig(mockConfig, 'sagas');
      const reducers = configReducers[0]();
      const sagas = configSagas[0]();

      expect(Object.keys(reducers)).toEqual(['userSlice']);
      expect(sagas[0].payload.args[0]).toBe('TEST_ACTION');
    });

  it('should merge package and user config data of any type', () => {
    const mockConfig = {
      packages: [
        {
          reducers: () => ({
            packageSlice: () => {},
            testSlice: () => {},
          }),
          sagas: () => ([
            takeLatest('TEST_ACTION', () => {}),
            takeLatest('TEST_ACTION_TWO', () => {}),
          ]),
        },
      ],
      reducers: () => ({
        userSlice: () => {},
        testSlice: () => {},
      }),
      sagas: () => ([
        takeEvery('TEST_ACTION_THREE', () => {}),
      ]),
    };
    const configReducers = getMergedFromUserConfig(mockConfig, 'reducers');
    const configSagas = getMergedFromUserConfig(mockConfig, 'sagas');
    const reducers = configReducers.reduce((acc, getter) => (
      { ...acc, ...getter() }
    ), {});
    const sagas = configSagas.reduce((acc, getter) => (
      [...acc, ...getter()]
    ), []);

    expect(Object.keys(reducers))
      .toEqual(['packageSlice', 'testSlice', 'userSlice']);
    expect(sagas[0].payload.args[0]).toBe('TEST_ACTION');
    expect(sagas[1].payload.args[0]).toBe('TEST_ACTION_TWO');
    expect(sagas[2].payload.args[0]).toBe('TEST_ACTION_THREE');
  });
});
