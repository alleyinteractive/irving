import { call, put } from 'redux-saga/effects';
import {
  actionReceiveUIComponents,
  actionRequestUIComponents,
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import fetchZephrUIComponents from 'services/zephrUIService';

const debug = createDebug('sagas:zephrUI');

export default function* resolveUIRules() {
  yield put(actionRequestUIComponents());

  try {
    const result = yield call(fetchZephrUIComponents);
    yield put(actionReceiveUIComponents(result));
  } catch (err) {
    yield call(debug, err);
  }
}
