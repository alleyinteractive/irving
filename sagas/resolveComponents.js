import { call, select, put } from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveError,
  actionFinishLoading,
} from 'actions';
import getRouteMeta from 'selectors/getRouteMeta';
import cacheResult from 'services/fetchComponents';
import getBearerToken from 'utils/getBearerToken';
import history from 'utils/history';
import isNode from 'utils/isNode';
import getRelativeUrl from 'utils/getRelativeUrl';
import createDebug from 'services/createDebug';
import resolveComponentsAuthorized from './resolveComponentsAuthorized';

const debug = createDebug('sagas:location');

export default function* resolveComponents() {
  const {
    path,
    search,
    cookie,
    context,
    cached,
  } = yield select(getRouteMeta);

  if (getBearerToken(cookie)) {
    yield* resolveComponentsAuthorized();
    return;
  }

  // Skip fetching components if we already have them cached in memory.
  if (cached) {
    yield put(actionFinishLoading());
    return;
  }

  try {
    const result = yield call(cacheResult, path, search, cookie, context);

    // Don't receive components on client side if redirecting,
    // otherwise will result in a confusing flash of empty page content.
    if ((result.redirectTo && isNode()) || ! result.redirectTo) {
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
    yield call(debug, err);
    yield put(actionReceiveError(err));
  }
}
