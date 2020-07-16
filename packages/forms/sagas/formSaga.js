import { call, put } from 'redux-saga/effects';
import getLogService from '@irvingjs/core/services/logService';
import {
  actionReceiveSubmitted,
  actionReceiveSubmitError,
  actionReceiveSubmitInvalid,
} from '../actions/formActions';
import submitForm from '../services/submitForm';

const debug = getLogService('irving:sagas:form');

export default function* watchRequestSubmit(data) {
  const {
    payload: { formName, submission },
  } = data;

  try {
    const response = yield call(submitForm, formName, submission);
    if (response && response.validation) {
      yield put(actionReceiveSubmitInvalid(formName, response.validation));
    } else {
      yield put(actionReceiveSubmitted(formName, response));
    }
  } catch (err) {
    yield put(actionReceiveSubmitError(formName, err));
    yield call(debug.error, err);
  }
}
