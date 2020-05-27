import { takeLatest, takeEvery } from 'redux-saga/effects';

module.exports = {
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
      proxyPassthrough: () => ([
        '/test/**/*',
      ]),
    },
  ],
  proxyPassthrough: [
    '/test-two/**/*',
  ],
  reducers: {
    userSlice: () => {},
    testSlice: () => {},
  },
  sagas: () => ([
    takeEvery('TEST_ACTION_THREE', () => {}),
  ]),
};
