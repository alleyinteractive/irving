import { takeLatest } from 'redux-saga/effects';
import { REQUEST_SUBMIT } from '../actions/types';
import watchRequestSubmit from './formSaga';

export default () => ([
  takeLatest(REQUEST_SUBMIT, watchRequestSubmit),
]);
