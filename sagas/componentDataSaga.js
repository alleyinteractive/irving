import { call, put } from 'redux-saga/effects';
import {
  actionReceiveComponentData,
  actionReceiveComponentError,
} from 'actions/componentDataActions';
import fetchComponentData from 'services/fetchComponentData';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:componentData');

export default function* watchComponentData(action) {
  const {
    payload: { componentName },
  } = action;

  try {
    const response = yield call(fetchComponentData, componentName);

    if (response) {
      yield put(actionReceiveComponentData(componentName, response));
    } else {
      yield put(actionReceiveComponentError(componentName));
    }
  } catch (err) {
    yield put(actionReceiveComponentError(componentName));
    yield call(debug, err);
  }
}
