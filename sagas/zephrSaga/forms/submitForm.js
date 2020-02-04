/* eslint-disable no-unused-vars */
import { call, put } from 'redux-saga/effects';
import {
  actionReceiveUserSession,
  actionReceiveUserProfile,
  actionReceiveLoginError,
  actionReceiveUserRegistration,
  actionReceiveUserLogin,
} from 'actions/zephrActions';
import zephrService from 'services/zephrService';
import history from 'utils/history';

/**
 * A generator that is called on the submission of a Zephr form. The form
 * type is checked and a subsequent request will be made to the cooresponding
 * endpoint in the Zephr API.
 *
 * @param {{ route, credentials }} The form to be submitted.
 */
export default function* submitForm({ payload: { route, credentials } }) {
  switch (route) {
    case '/login':
      yield call(submitLogin, credentials);
      break;
    case '/register':
      yield call(submitRegistration, credentials);
      break;
    default:
      // do nothing
      break;
  }
}

/**
 * Submit the user login request to Zephr.
 *
 * @param {{ email, password }} credentials The user's login credentials.
 */
function* submitLogin(credentials) {
  // Submit the form to Zephr.
  const response = yield call(zephrService.login, credentials);
  const {
    status,
    type,
    cookie,
    trackingId,
  } = response;

  if ('success' === status) {
    // Store the session data for later use.
    yield put(actionReceiveUserSession({ sessionCookie: cookie, trackingId }));
    // Set the user's login state and clean up any existing error state on the form.
    yield put(actionReceiveUserLogin());
    // Get the user's profile and redirect.
    yield call(getProfile);
    // Push the user to the homepage.
    history.push('/');
  } else {
    // Set the error state on the form.
    yield put(actionReceiveLoginError(type));
  }
}

/**
 * Submit the user's registration request to Zephr.
 *
 * @param {{ email, password, attributes }} credentials The user's registration credentials.
 */
function* submitRegistration(credentials) {
  // Submit the form to Zephr.
  const response = yield call(zephrService.register, credentials);
  const {
    status,
    cookie,
    trackingId,
  } = response;

  if ('success' === status) {
    // Store the session data for later use.
    yield put(actionReceiveUserSession({ sessionCookie: cookie, trackingId }));
    // Set the user's email verification state in the store to false on initial registration.
    yield put(actionReceiveUserRegistration());
    // Get the user's profile and redirect.
    yield call(getProfile);
    // Push the user to the confirmation page.
    history.push('/register/confirmation');
  }
}

/**
 * Use the session cookie set by logging in or registering a user with Zephr to retrieve
 * their profile and store their information in our Redux store.
 */
function* getProfile() {
  // Get the user's profile.
  const profile = yield call(zephrService.getProfile);

  // `null` will be returned if no profile can be found.
  if ('object' === typeof profile) {
    // Store user profile information.
    yield put(actionReceiveUserProfile(profile));
  }
}
