import { call, put } from 'redux-saga/effects';
import {
  actionReceiveSubmitted,
  actionReceiveSubmitError,
  actionReceiveSubmitInvalid,
} from 'actions/formActions';
import submitForm from 'services/submitForm';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:form');

export default function* watchRequestSubmit(data) {
  const {
    payload: { formName, submission },
  } = data;

  try {
    const messageMap = yield call(submitForm, formName, submission);
    if (messageMap) {
      yield put(actionReceiveSubmitInvalid(formName, messageMap));
    } else {
      yield put(actionReceiveSubmitted(formName));
    }
  } catch (err) {
    yield put(actionReceiveSubmitError(formName, err));
    yield call(debug, err);
  }
}
