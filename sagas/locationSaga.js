import { call, select, put } from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveApiError,
} from 'actions';
import getRouteComponentOptions from 'selectors/getRouteComponentOptions';
import fetchComponents from 'services/fetchComponents';

/**
 * Emit location change side effects.
 */
export default function* watchLocationChange() {
  const { path, context } = yield select(getRouteComponentOptions);
  try {
    const { components, notFound } = yield call(fetchComponents, path, context);
    yield put(actionReceiveComponents(components, notFound));
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(actionReceiveApiError());
  }
}
