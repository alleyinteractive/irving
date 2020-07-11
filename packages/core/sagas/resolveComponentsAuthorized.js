import {
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveError,
  actionRequestComponentsAuthorized,
} from 'actions';
import getRouteMeta from 'selectors/getRouteMeta';
import { fetchComponents } from 'services/fetchComponents';
import getLogService from '@irvingjs/services/logService';

const debug = getLogService('irving:sagas:authorization');

export default function* resolveComponentsAuthorized() {
  const {
    path,
    search,
    cookie,
    context,
  } = yield select(getRouteMeta);
  yield put(actionRequestComponentsAuthorized());

  try {
    const result = yield call(fetchComponents, path, search, cookie, context);
    yield put(actionReceiveComponents(result));
  } catch (err) {
    yield call(debug, err);
    yield put(actionReceiveError(err));
  }
}
