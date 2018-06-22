import { call, select, put } from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveApiError,
} from 'actions';
import { CONTEXT_PAGE, CONTEXT_SITE } from 'config/constants';
import fetchComponents from 'services/fetchComponents';

/**
 * Emit location change side effects.
 */
export default function* watchLocationChange() {
  const { path, context } = yield select((state) => ({
    path: state.route.pathname,
    // Request the default site components if the Redux state doesn't have any yet.
    context: state.components.defaults.length ? CONTEXT_PAGE : CONTEXT_SITE,
  }));

  try {
    const result = yield call(fetchComponents, path, context);
    yield put(actionReceiveComponents(result));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(actionReceiveApiError());
  }
}
