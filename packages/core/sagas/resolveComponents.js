import {
  call,
  select,
  put,
} from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveError,
  actionFinishLoading,
} from 'actions';
import getRouteMeta from 'selectors/getRouteMeta';
import getRouteCookies from 'selectors/getRouteCookies';
import cachedFetchComponents, {
  fetchComponents,
} from 'services/fetchComponents';
import {
  shouldAuthorize,
  getAuthToken,
} from 'utils/authorization';
import history from 'utils/history';
import isNode from 'utils/isNode';
import getRelativeUrl from 'utils/getRelativeUrl';
import createRouteLogTags from 'utils/createRouteLogTags';
import getLogService from '@irvingjs/services/logService';
import { getEnv } from 'config/multisite';
import resolveComponentsAuthorized from './resolveComponentsAuthorized';

const log = getLogService('irving:sagas:location');

export default function* resolveComponents() {
  const routeMeta = yield select(getRouteMeta);
  const routeCookies = yield select(getRouteCookies);
  // If auth token cookie is set, bypass redis when fetching components.
  const {
    cookie,
    cached,
    hostname,
  } = routeMeta;
  const authToken = getAuthToken(cookie);
  const fetchService = authToken ? fetchComponents : cachedFetchComponents;

  if (shouldAuthorize(cookie)) {
    yield* resolveComponentsAuthorized();
    return;
  }

  // Skip fetching components if we already have them cached in memory.
  if (cached) {
    yield put(actionFinishLoading());
    return;
  }

  try {
    const result = yield call(
      fetchService,
      routeMeta,
      routeCookies,
    );

    // Only redirect on client side and if there's a redirect set up,
    // otherwise just receive components. This prevents a strange flash of
    // content before the redirect.
    if ((result.redirectTo && isNode()) || !result.redirectTo) {
      yield put(actionReceiveComponents(result));
      return;
    }

    // Request needs to be redirected.
    if (result.redirectTo) {
      const relativeUrl = getRelativeUrl(result.redirectTo);

      if (relativeUrl) {
        yield call([history, history.replace], relativeUrl);
      } else {
        window.location = result.redirectTo;
      }
    }
  } catch (err) {
    yield call(log.error, err, {
      tags: createRouteLogTags(routeMeta, getEnv(hostname)),
    });
    yield put(actionReceiveError(err));
  }
}
