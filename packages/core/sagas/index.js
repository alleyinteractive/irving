import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import getConfigField from 'utils/getConfigField';
import {
  LOCATION_CHANGE,
  REQUEST_COMPONENT_DATA,
} from 'actions/types';
import resolveComponents from './resolveComponents';
import waitToScroll from './waitToScroll';
import onLocationChange from './onLocationChange';
import watchComponentData from './componentDataSaga';

const sagaGetters = getConfigField('sagas');
const customSagas = sagaGetters.reduce((acc, getter) => (
  [...acc, ...getter()]
), []);

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  yield all([
    takeLatest(LOCATION_CHANGE, resolveComponents),
    takeLatest(LOCATION_CHANGE, waitToScroll),
    takeEvery(LOCATION_CHANGE, onLocationChange),
    takeEvery(REQUEST_COMPONENT_DATA, watchComponentData),
    ...customSagas,
  ]);
}
