import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'actions/types';
import resolveComponents from './resolveComponents';
import waitToScroll from './waitToScroll';
import onLocationChange from './onLocationChange';

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  yield all([
    takeLatest(LOCATION_CHANGE, resolveComponents),
    takeLatest(LOCATION_CHANGE, waitToScroll),
    takeEvery(LOCATION_CHANGE, onLocationChange),
  ]);
}
