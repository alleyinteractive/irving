import { call, put } from 'redux-saga/effects';
import { actionUserEmailError, actionUserEmailSent } from 'actions/userActions';
import sendEmail from 'services/mandrillService';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:email');

export default function* watchRequestEmail(data) {
  const {
    payload: { email },
  } = data;

  try {
    const response = yield call(sendEmail, email);
    // Depending on what happens with mandrill, tell redux about it.

    yield put(actionUserEmailSent(response));
  } catch (err) {
    yield put(actionUserEmailError(email, err));
    yield call(debug, err);
  }
}
