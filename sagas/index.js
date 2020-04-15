import {
  all,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import {
  LOCATION_CHANGE,
  REQUEST_COMPONENT_DATA,
  // REQUEST_COMPONENTS_AUTHORIZED,
} from 'actions/types';
import resolveComponents from './resolveComponents';
import waitToScroll from './waitToScroll';
import onLocationChange from './onLocationChange';
import watchComponentData from './componentDataSaga';
import formSaga from './formSaga';
import userSaga from './userSaga';
import zephrSaga from './zephrSaga';

/**
 * A temporary function to allow for local development to be done on ported
 * instances (e.g. localhost:3001) without instantiating the Zephr saga flow.
 *
 * @returns {array} sagas
 */
const zephrSagas = (() => {
  const {
    port,
  } = window.location;

  // Don't load zephr on ported instances.
  if (
    'development' === process.env.NODE_ENV &&
    '3001' === port
  ) {
    return [];
  }

  return zephrSaga;
})();

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  yield all([
    takeLatest(LOCATION_CHANGE, resolveComponents),
    takeLatest(LOCATION_CHANGE, waitToScroll),
    takeEvery(LOCATION_CHANGE, onLocationChange),
    takeEvery(REQUEST_COMPONENT_DATA, watchComponentData),
    takeEvery(REQUEST_COMPONENT_DATA, watchComponentData),
    ...formSaga,
    ...userSaga,
    ...zephrSagas,
  ]);
}
