import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  REQUEST_COMPONENT_DATA,
} from 'actions/types';
import { getValueFromMergedConfig } from 'config/irving/getValueFromMergedConfig';
import resolveComponents from './resolveComponents';
import waitToScroll from './waitToScroll';
import onLocationChange from './onLocationChange';
import watchComponentData from './componentDataSaga';

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  // Ensure authorized component requests are also made after initial server-side render.
  yield* resolveComponents();

  yield all(
    getValueFromMergedConfig('sagas', [
      takeLatest(LOCATION_CHANGE, resolveComponents),
      takeLatest(LOCATION_CHANGE, waitToScroll),
      takeEvery(LOCATION_CHANGE, onLocationChange),
      takeEvery(REQUEST_COMPONENT_DATA, watchComponentData),
    ])
  );
}
