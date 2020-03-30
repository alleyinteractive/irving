import {
  takeEvery,
  put,
  call,
} from 'redux-saga/effects';
import {
  RECEIVE_SSO_SESSION,
} from 'actions/types';
import {
  actionReceiveUserSession,
  actionReceiveUserLogin,
  actionSendUserVerificationEmail,
  actionReceiveUserRegistration,
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import history from 'utils/history';
import formService from 'services/zephrService';
import {
  getAccount,
  getProfile,
} from '../forms/submitForm';

const debug = createDebug('sagas:ssoSaga');

export default [
  takeEvery(RECEIVE_SSO_SESSION, completeSignOn),
];

/**
 * A generator that takes a given sign-on action initiated by a single sign-on
 * (SSO) provider and performs the correct actions.
 *
 * @param {object} payload The action payload.
 */
function* completeSignOn({ payload: { identifier, cookie, action } }) {
  if ('register' === action) {
    yield put(actionReceiveUserRegistration());

    try {
      yield call(formService.sendVerificationEmail, identifier);
      // Update the state to reflect the email being sent.
      yield put(actionSendUserVerificationEmail());
      // Push the user to the confirmation page.
      history.push('/register/confirmation/');
    } catch (error) {
      yield call(debug, error);
    }
  }

  if ('login' === action) {
    // Store the session data for later use.
    yield put(actionReceiveUserSession({ sessionCookie: cookie }));
    yield put(actionReceiveUserLogin());

    try {
      // Get the user's profile.
      yield call(getProfile, cookie);
      // Get the user's account.
      yield call(getAccount, cookie);
      // Push the user to the homepage.
      history.push('/');
    } catch (error) {
      // Post the error message to the console.
      yield call(debug, error);
    }
  }
}
