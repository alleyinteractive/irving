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
import getRouteCookies from 'selectors/getRouteCookies';
import { fetchComponents } from 'services/fetchComponents';
import getLogService from '@irvingjs/services/logService';
import { getEnv } from 'config/multisite';

const log = getLogService('irving:sagas:authorization');

export default function* resolveComponentsAuthorized() {
  const routeMeta = yield select(getRouteMeta);
  const routeCookies = yield select(getRouteCookies);
  const {
    hostname,
    path,
    search,
  } = routeMeta;
  yield put(actionRequestComponentsAuthorized());

  try {
    const result = yield call(
      fetchComponents,
      routeMeta,
      routeCookies,
    );
    yield put(actionReceiveComponents(result));
  } catch (err) {
    const { ROOT_URL } = getEnv(hostname);
    yield call(
      log.error,
      '%o',
      err,
      {
        tags: {
          ROOT_URL,
          errorUrl: hostname + path + search,
        }
      },
    );
    yield put(actionReceiveError(err));
  }
}
