import {
  call,
  select,
  put
} from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveError,
  actionFinishLoading,
} from 'actions';
import getRouteMeta from 'selectors/getRouteMeta';
import cachedFetchComponents, {
  fetchComponents,
} from 'services/fetchComponents';
import shouldAuthorize, {
  getBearerToken
} from 'utils/shouldAuthorize';
import history from 'utils/history';
import isNode from 'utils/isNode';
import getRelativeUrl from 'utils/getRelativeUrl';
import getLogService from 'services/logService';
import resolveComponentsAuthorized from './resolveComponentsAuthorized';

const debug = getLogService('irving:sagas:location');

export default function* resolveComponents() {
  const {
    path,
    search,
    cookie,
    context,
    cached,
  } = yield select(getRouteMeta);
  // If bearer token cookie is set, bypass redis when fetching components.
  const bearerToken = getBearerToken(cookie);
  const fetchService = bearerToken ? fetchComponents : cachedFetchComponents;

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
      path,
      search,
      cookie,
      context
    );

    // Don't receive components on client side if redirecting,
    // otherwise will result in a confusing flash of empty page content.
    if ((result.redirectTo && isNode()) || !result.redirectTo) {
      yield put(actionReceiveComponents(result));
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
    yield call(debug.error, err);
    yield put(actionReceiveError(err));
  }
}
