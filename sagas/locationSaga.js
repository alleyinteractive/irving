import { call, select, put } from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveError,
  actionFinishLoading,
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
  const {
    path,
    search,
    context,
    cached,
  } = yield select((state) => ({
    path: state.route.pathname,
    search: state.route.search,
    // Request the default site components if the Redux state doesn't have any yet.
    context: state.components.defaults.length ? CONTEXT_PAGE : CONTEXT_SITE,
    cached: !! getPageComponents(state).length,
  }));

  // Skip fetching components if we already have them cached in memory.
  if (cached) {
    yield put(actionFinishLoading());
    return;
  }

  try {
    const result = yield call(fetchComponents, path, search, context);
    yield put(actionReceiveComponents(result));
    if (result.redirectTo) {
      yield call([history, history.replace], result.redirectTo);
    }
  } catch (err) {
    yield call(debug, err);
    yield put(actionReceiveError(err));
  }
}
