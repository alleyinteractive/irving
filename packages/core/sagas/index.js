import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  RECEIVE_COMPONENTS,
  FINISH_LOADING,
  REQUEST_COMPONENT_DATA,
} from 'actions/types';
import {
  getValueFromConfig,
} from 'config/irving/getValueFromConfig';
import resolveComponents from './resolveComponents';
import waitToScroll from './waitToScroll';
import onLocationChange from './onLocationChange';
import watchComponentData from './componentDataSaga';

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  // Set waitToScroll saga up first to ensure it functions properly for
  // SSR loads that make a subsequent authorized request.
  yield takeLatest([
    RECEIVE_COMPONENTS,
    FINISH_LOADING,
  ], waitToScroll);

  // Ensure authorized component requests and auto-scrolling
  // are also made after initial server-side render.
  yield* resolveComponents();

  yield all(getValueFromConfig('sagas', [
    takeLatest(LOCATION_CHANGE, resolveComponents),
    takeEvery(LOCATION_CHANGE, onLocationChange),
    takeEvery(REQUEST_COMPONENT_DATA, watchComponentData),
  ]));
}
