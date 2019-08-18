import { takeLatest, takeEvery } from 'redux-saga/effects';
import getConfigSagas from './getConfigSagas';

it('should get sagas from configured packages', () => {
  const mockConfig = {
    packages: {
      test: {
        sagas: () => ([
          takeLatest('TEST_ACTION', () => {}),
        ]),
      },
    },
  };
  const configSagas = getConfigSagas(mockConfig);

  expect(configSagas[0].payload.args[0]).toBe('TEST_ACTION');
});

it('should get user-configured sagas', () => {
  const mockConfig = {
    sagas: () => ([
      takeLatest('TEST_ACTION', () => {}),
    ]),
  };
  const configSagas = getConfigSagas(mockConfig);

  expect(configSagas[0].payload.args[0]).toBe('TEST_ACTION');
});

it('should merge package and user sagas', () => {
  const mockConfig = {
    packages: {
      test: {
        sagas: () => ([
          takeLatest('TEST_ACTION', () => {}),
          takeLatest('TEST_ACTION_TWO', () => {}),
        ]),
      },
    },
    sagas: () => ([
      takeEvery('TEST_ACTION_THREE', () => {}),
    ]),
  };
  const configSagas = getConfigSagas(mockConfig);

  expect(configSagas[0].payload.args[0]).toBe('TEST_ACTION');
  expect(configSagas[1].payload.args[0]).toBe('TEST_ACTION_TWO');
  expect(configSagas[2].payload.args[0]).toBe('TEST_ACTION_THREE');
});
