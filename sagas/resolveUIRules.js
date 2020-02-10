import { call, put, select } from 'redux-saga/effects';
import {
  actionReceiveUIComponents,
  actionRequestUIComponents,
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import getPageID from 'selectors/getPageID';
import { getSession } from 'selectors/zephrSelector';
import fetchZephrUIComponents from 'services/zephrUIService';

const debug = createDebug('sagas:zephrUI');

export default function* resolveUIRules() {
  yield put(actionRequestUIComponents());

  try {
    const { pageID } = yield select(getPageID);
    const session = yield select(getSession);
    const result = yield call(fetchZephrUIComponents, { pageID, session });
    yield put(actionReceiveUIComponents(result));
  } catch (err) {
    yield call(debug, err);
  }
}
