import { takeLatest, takeEvery } from 'redux-saga/effects';
import getMergedConfigField from './getMergedConfigField';

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
  const configReducers = getMergedConfigField(mockConfig, 'reducers');
  const configSagas = getMergedConfigField(mockConfig, 'sagas');

  expect(Object.keys(configReducers)).toEqual(['mySlice']);
  expect(configSagas[0].payload.args[0]).toBe('TEST_ACTION');
});

it('should get user-configured config data of both object and array types', () => {
  const mockConfig = {
    reducers: () => ({
      userSlice: () => {},
    }),
    sagas: () => ([
      takeLatest('TEST_ACTION', () => {}),
    ]),
  };
  const configReducers = getMergedConfigField(mockConfig, 'reducers');
  const configSagas = getMergedConfigField(mockConfig, 'sagas');

  expect(Object.keys(configReducers)).toEqual(['userSlice']);
  expect(configSagas[0].payload.args[0]).toBe('TEST_ACTION');
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
  const configReducers = getMergedConfigField(mockConfig, 'reducers');
  const configSagas = getMergedConfigField(mockConfig, 'sagas');

  expect(Object.keys(configReducers))
    .toEqual(['packageSlice', 'testSlice', 'userSlice']);
  expect(configSagas[0].payload.args[0]).toBe('TEST_ACTION');
  expect(configSagas[1].payload.args[0]).toBe('TEST_ACTION_TWO');
  expect(configSagas[2].payload.args[0]).toBe('TEST_ACTION_THREE');
});
