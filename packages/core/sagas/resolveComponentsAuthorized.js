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

const log = getLogService('irving:sagas:authorization');

export default function* resolveComponentsAuthorized() {
  const {
    hostname,
    path,
    search,
    cookie,
    context,
  } = yield select(getRouteMeta);
  yield put(actionRequestComponentsAuthorized());

  try {
    const result = yield call(
      fetchComponents,
      hostname,
      path,
      search,
      cookie,
      context
    );
    yield put(actionReceiveComponents(result));
  } catch (err) {
    yield call(log.error, '%o', err);
    yield put(actionReceiveError(err));
  }
}
