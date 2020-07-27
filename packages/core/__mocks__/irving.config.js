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
      getAppTemplateVars: {
        head: {
          open: '<script>const anotherTest = 200;</script>',
          link: ['<link rel="stylesheet" href="css/test.css" />'],
          meta: [() => '<meta name="keywords" content="this, is, a, test" />'],
        },
      },
    },
  ],
  defaultState: {
    testState: true,
  },
  getAppTemplateVars: {
    testVal: 'this is a fun field for the app',
    head: {
      open: ['<script>const test = 100;</script>'],
      link: ['<link rel="stylesheet" href="css/lorem.css" />'],
      meta: [() => '<meta name="description" content="lorem ipsum dolor sit amet" />'],
    },
  },
  getErrorTemplateVars: {
    testVal: 'this is a fun field for the error',
  },
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
