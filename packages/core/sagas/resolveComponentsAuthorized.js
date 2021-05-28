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
import createRouteLogTags from 'utils/createRouteLogTags';
import { getEnv } from 'config/multisite';

const log = getLogService('irving:sagas:authorization');

export default function* resolveComponentsAuthorized() {
  const routeMeta = yield select(getRouteMeta);
  const {
    hostname,
    path,
    search,
    cookie,
    context,
  } = routeMeta;
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
    yield call(
      log.error,
      '%o',
      err,
      {
        tags: createRouteLogTags(routeMeta, getEnv(hostname)),
      }
    );
    yield put(actionReceiveError(err));
  }
}
