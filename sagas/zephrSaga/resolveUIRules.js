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
    const { pageID } = yield select(getPageID);
    const session = yield select(getSession);
    const routeKey = yield select(getRouteKey);

    // before we make the request, use the route key in teh get page ID selector
    // to make sure that its getting the right page ID/
    const components = yield call(fetchZephrUIComponents, { pageID, session });

    yield put(actionReceiveUIComponents({ components, routeKey, pageID }));
  } catch (err) {
    yield call(debug, err);
  }
}
