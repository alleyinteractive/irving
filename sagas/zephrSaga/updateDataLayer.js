import { call, put, select } from 'redux-saga/effects';
import {
  actionRequestZephrDataLayer,
  actionReceiveZephrDataLayer,
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import { getSession } from 'selectors/zephrSelector';
import { fetchZephrDataLayer, pushDataLayer } from 'services/zephrUIService';

const debug = createDebug('sagas:zephrDataLayer');

/**
 * Worker generator that sends actions to request and receive the dataLayer API
 * endpoint from Zephr.
 */
export default function* updateDataLayer() {
  yield put(actionRequestZephrDataLayer());

  try {
    const session = yield select(getSession);
    const { dataLayer } = yield call(fetchZephrDataLayer, session);
    yield put(actionReceiveZephrDataLayer(dataLayer));
    yield call(pushDataLayer, dataLayer);
  } catch (err) {
    yield call(debug, err);
  }
}
