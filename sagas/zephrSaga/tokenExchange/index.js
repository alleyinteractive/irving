import {
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  actionReceiveUserSession,
  actionReceiveUserVerification,
} from 'actions/zephrActions';
import {
  VERIFY_ZEPHR_USER_TOKEN,
  RECEIVE_ZEPHR_USER_VERIFICATION,
} from 'actions/types';
import zephrService from 'services/zephrService';
import history from 'utils/history';
import createDebug from 'services/createDebug';
import {
  getProfile,
  getAccount,
} from '../forms/submitForm';

const debug = createDebug('sagas:tokenExchange');

export default [
  // Listen for token verification request.
  takeEvery(VERIFY_ZEPHR_USER_TOKEN, verifyToken),
  // Listen for the verification status and redirect the user.
  takeLatest(RECEIVE_ZEPHR_USER_VERIFICATION, () => {
    setTimeout(() => {
      history.push('/');
    }, 5000);
  }),
];

function* verifyToken({ payload }) {
  try {
    const cookie = yield call(zephrService.verifyEmail, payload);

    if (false !== cookie) {
      // Store the session data for later use.
      yield put(actionReceiveUserSession({ sessionCookie: cookie }));
      // Get the user's profile.
      yield call(getProfile, cookie);
      // Get the user's account.
      yield call(getAccount, cookie);
      // Wait until profile and account details have been retrieved to redirect.
      yield put(actionReceiveUserVerification());
    }
  } catch (error) {
    yield call(debug, error);
  }
}
