import { call, put, select } from 'redux-saga/effects';
import {
  actionRequestZephrDataLayer,
  actionReceiveZephrDataLayer,
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import { getSession } from 'selectors/zephrSelector';
import { fetchZephrDataLayer } from 'services/zephrUIService';

const debug = createDebug('sagas:zephrDataLayer');

export default function* resolveUIRules() {
  yield put(actionRequestZephrDataLayer());

  try {
    const session = yield select(getSession);
    const { dataLayer } = yield call(fetchZephrDataLayer, session);
    yield put(actionReceiveZephrDataLayer(dataLayer));
  } catch (err) {
    yield call(debug, err);
  }
}
