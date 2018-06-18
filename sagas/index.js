import { all, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'actions/types';
import watchLocationChange from './locationSaga';

/**
 * Combine all continuous sagas, and run them in parallel.
 */
export default function* rootSaga() {
  yield all([
    takeLatest(LOCATION_CHANGE, watchLocationChange),
  ]);
}
