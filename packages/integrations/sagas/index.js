import { all } from 'redux-saga/effects';
import {
  getValueFromConfig,
} from '@irvingjs/core/config/irving/getValueFromConfig';
import picoSaga from './picoSaga';

/**
 * Combine all sagas, and run them continuously in parallel.
 */
export default function* rootSaga() {
  yield all(
    getValueFromConfig('sagas', [picoSaga])
  );
}
