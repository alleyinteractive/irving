import { takeLatest, takeEvery } from 'redux-saga/effects';

export default {
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
  customizeRedirect: {
    subDomain: 'www',
  },
  defaultState: {
    testState: true,
  },
  envAllowList: [
    'TEST_ENV',
  ],
  getAppTemplateVars: {
    testVal: 'this is a fun field for the app',
  },
  getErrorTemplateVars: {
    testVal: 'this is a fun field for the error',
  },
  proxyPassthrough: [
    '/test-two/**/*',
  ],
  trailingSlashDenylist: [
    '/do/not/trailing/slash/me',
  ],
  reducers: {
    userSlice: () => {},
    testSlice: () => {},
  },
  sagas: () => ([
    takeEvery('TEST_ACTION_THREE', () => {}),
  ]),
};
