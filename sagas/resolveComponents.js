import { call, select, put } from 'redux-saga/effects';
import { URL } from 'whatwg-url';
import {
  actionReceiveComponents,
  actionReceiveError,
  actionFinishLoading,
} from 'actions';
import getRouteMeta from 'selectors/getRouteMeta';
import fetchComponents from 'services/fetchComponents';
import history from 'utils/history';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:location');

export default function* resolveComponents() {
  const {
    path,
    search,
    context,
    cached,
  } = yield select(getRouteMeta);

  // Skip fetching components if we already have them cached in memory.
  if (cached) {
    yield put(actionFinishLoading());
    return;
  }

  try {
    const result = yield call(fetchComponents, path, search, context);
    yield put(actionReceiveComponents(result));

    // Request needs to be redirected.
    if (result.redirectTo) {
      try {
        // Use whatwg-url to test if the redirect is absolute or relative.
        const urlObj = new URL(result.redirectTo);
        if (urlObj.host) {
          // Redirect via location.replace (for absolute urls).
          window.location.replace(result.redirectTo);
        }
      } catch (e) {
        // Redirect via history (for relative paths).
        yield call([history, history.replace], result.redirectTo);
      }
    }
  } catch (err) {
    yield call(debug, err);
    yield put(actionReceiveError(err));
  }
}
