import {
  RECEIVE_COMPONENTS,
  REQUEST_ZEPHR_UI_COMPONENTS,
  FINISH_LOADING,
} from 'actions/types';
import {
  call,
  takeLatest,
} from 'redux-saga/effects';
import formSaga from './forms';
import tokenExchangeSaga from './tokenExchange';
import resolveUIRules from './resolveUIRules';
import updateDataLayer from './updateDataLayer';
import ssoSaga from './sso';

export default [
  ...formSaga,
  ...tokenExchangeSaga,
  ...ssoSaga,

  // Needs to be run on the first site load regardless.
  call(resolveUIRules),

  // This saga is run on receive components so that a request for new UI
  // components is made only when the content ID has been updated in the store
  // and the request can be checked against new content.
  takeLatest(RECEIVE_COMPONENTS, resolveUIRules),
  takeLatest(FINISH_LOADING, resolveUIRules),

  // Every time that the components are updated, request new analytics data.
  takeLatest(REQUEST_ZEPHR_UI_COMPONENTS, updateDataLayer),
];
