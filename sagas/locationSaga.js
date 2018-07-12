import { call, select, put } from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveApiError,
} from 'actions';
import { CONTEXT_PAGE, CONTEXT_SITE } from 'config/constants';
import getPageComponents from 'selectors/getPageComponents';
import fetchComponents from 'services/fetchComponents';
import history from 'utils/history';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:location');

/**
 * Emit location change side effects.
 */
export default function* watchLocationChange() {
  const { path, context, cached } = yield select((state) => ({
    path: state.route.pathname,
    // Request the default site components if the Redux state doesn't have any yet.
    context: state.components.defaults.length ? CONTEXT_PAGE : CONTEXT_SITE,
    cached: !! getPageComponents(state).length,
  }));

  // Skip fetching components if we already have them cached in memory.
  if (cached) {
    return;
  }

  try {
    const result = yield call(fetchComponents, path, context);
    yield put(actionReceiveComponents(result));
    if (result.redirectTo) {
      yield call([history, history.replace], result.redirectTo);
    }
  } catch (err) {
    debug(err);
    yield put(actionReceiveApiError());
  }
}
