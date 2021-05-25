import { call, put } from 'redux-saga/effects';
import {
  actionReceiveSubmitted,
  actionReceiveSubmitError,
  actionReceiveSubmitInvalid,
} from '../actions/formActions';
import submitForm from '../services/submitForm';

export default function* watchRequestSubmit(data) {
  const {
    payload: { formEndpoint, submission },
  } = data;

  try {
    const response = yield call(submitForm, formEndpoint, submission);
    if (
      response
      && response.validation
      && Object.keys(response.validation).length
    ) {
      yield put(actionReceiveSubmitInvalid(formEndpoint, response.validation));
    } else {
      yield put(actionReceiveSubmitted(formEndpoint, response));
    }
  } catch (err) {
    yield put(actionReceiveSubmitError(formEndpoint, err));
  }
}
