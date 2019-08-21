import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import getIrvingConfig from 'utils/getIrvingConfig';
import getFieldFromUserConfig from 'utils/getFieldFromUserConfig';
import {
  LOCATION_CHANGE,
  REQUEST_COMPONENT_DATA,
} from 'actions/types';
import resolveComponents from './resolveComponents';
import waitToScroll from './waitToScroll';
import onLocationChange from './onLocationChange';
import watchComponentData from './componentDataSaga';

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  yield all([
    takeLatest(LOCATION_CHANGE, resolveComponents),
    takeLatest(LOCATION_CHANGE, waitToScroll),
    takeEvery(LOCATION_CHANGE, onLocationChange),
    takeEvery(REQUEST_COMPONENT_DATA, watchComponentData),
    ...getFieldFromUserConfig(getIrvingConfig(), 'sagas', 'array'),
  ]);
}
