import {
  call,
  put,
  select,
} from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveError,
} from 'actions';
import getRouteMeta from 'selectors/getRouteMeta';
// Use uncached version of fetchComponents.
import { fetchComponents } from 'services/fetchComponents';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:components:authorized');

export default function* resolveComponentsAuthorized() {
  const {
    path,
    search,
    cookie,
    context,
  } = yield select(getRouteMeta);

  try {
    const result = yield call(fetchComponents, path, search, cookie, context);
    yield put(actionReceiveComponents(result));
  } catch (err) {
    yield call(debug, err);
    yield put(actionReceiveError(err));
  }
}
