import { call, select, put } from 'redux-saga/effects';
import {
  actionReceiveComponents,
  actionReceiveApiError,
} from 'actions';
import fetchComponents from 'services/fetchPage';
import getPageParams from 'selectors/getPagParams';

/**
 * Emit location change side effects.
 */
export default function* watchLocationChange() {
  const { path, context } = yield select(getPageParams);

  try {
    const components = yield call(fetchComponents, path, context);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(actionReceiveApiError());
  }


  // how did we get the status?


  const location = yield select((state) => state.location);
  const hasSiteComponents = yield select((state) => !!state.siteComponents.length);
  yield call(fetchPage, location.path)
  // get url
  // do request
  // if null we have a 404
  // if error update

  yield put()
}
