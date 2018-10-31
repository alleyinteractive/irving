import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  REQUEST_SUBMIT,
} from 'actions/types';
import resolveComponents from './resolveComponents';
import waitToScroll from './waitToScroll';
import watchRequestSubmit from './formSaga';
import onLocationChange from './onLocationChange';

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  yield all([
    takeLatest(LOCATION_CHANGE, resolveComponents),
    takeLatest(LOCATION_CHANGE, waitToScroll),
    takeLatest(REQUEST_SUBMIT, watchRequestSubmit),
    takeEvery(LOCATION_CHANGE, onLocationChange),
  ]);
}
