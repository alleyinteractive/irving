import { call, put, select } from 'redux-saga/effects';
import {
  actionReceiveUIComponents,
  actionRequestUIComponents,
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import getPageID from 'selectors/getPageID';
import { getSession } from 'selectors/zephrSelector';
import { fetchZephrUIComponents } from 'services/zephrUIService';
import getRouteKey from 'selectors/getRouteKey'; // eslint-disable-line

const debug = createDebug('sagas:zephrUI');

export default function* resolveUIRules() {
  yield put(actionRequestUIComponents());

  try {
    const pageID = yield select(getPageID);
    const session = yield select(getSession);
    const routeKey = yield select(getRouteKey);
    const components = yield call(fetchZephrUIComponents, { pageID, session });
    yield put(actionReceiveUIComponents({ components, routeKey, pageID }));
  } catch (err) {
    yield call(debug, err);
  }
}
