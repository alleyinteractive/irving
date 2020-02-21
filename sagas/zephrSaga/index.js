import {
  RECEIVE_COMPONENTS,
} from 'actions/types';
import {
  call,
  takeLatest,
} from 'redux-saga/effects';
import formSaga from './forms';
import tokenExchangeSaga from './tokenExchange';
import resolveUIRules from './resolveUIRules';

export default [
  ...formSaga,
  ...tokenExchangeSaga,
  // Needs to be run on the first site load regardless.
  call(resolveUIRules),
  // This saga is run on receive components so that a request for new UI
  // components is made only when the content ID has been updated in the store
  // and the request can be checked against new content.
  takeLatest(RECEIVE_COMPONENTS, resolveUIRules),
];
