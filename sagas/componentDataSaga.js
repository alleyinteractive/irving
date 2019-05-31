import { call, put } from 'redux-saga/effects';
import {
  actionReceiveComponentData,
  actionReceiveComponentDataError,
} from 'actions/componentDataActions';
import fetchComponentData from 'services/fetchComponentData';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:componentData');

export default function* watchComponentData(action) {
  const {
    payload: { endpoint },
  } = action;

  try {
    const response = yield call(fetchComponentData, endpoint);

    if (response) {
      yield put(actionReceiveComponentData(endpoint, response));
    } else {
      yield put(actionReceiveComponentDataError(endpoint, response));
    }
  } catch (err) {
    yield put(actionReceiveComponentDataError(endpoint, err));
    yield call(debug, err);
  }
}
