/* eslint-disable no-unused-vars */
import { call, put, select } from 'redux-saga/effects';
import {
  actionReceiveUserSession,
  actionReceiveUserProfile,
  actionReceiveLoginError,
  actionReceiveUserRegistration,
  actionReceiveUserLogin,
  actionReceiveUserAccount,
  actionSendUserVerificationEmail,
  actionReceiveRegistrationError,
  actionReceiveResetError,
} from 'actions/zephrActions';
import zephrService from 'services/zephrService';
import nexusService from 'services/nexusService';
import history from 'utils/history';
import createDebug from 'services/createDebug';
import {
  getZephrCookie,
  getProfile as getUserProfile,
} from 'selectors/zephrSelector';

const debug = createDebug('sagas:submitZephrForm');

/**
 * A generator that is called on the submission of a Zephr form. The form
 * type is checked and a subsequent request will be made to the corresponding
 * endpoint in the Zephr API.
 *
 * @param {{ route, credentials }} The form to be submitted.
 */
export default function* submitForm({ payload: { type, credentials } }) {
  const cookie = yield select(getZephrCookie);

  switch (type) {
    case 'login':
      yield call(submitLogin, credentials);
      break;
    case 'register':
      yield call(submitRegistration, credentials);
      break;
    case 'resetRequest':
      yield call(submitResetRequest, credentials);
      break;
    case 'reset':
      yield call(submitReset, credentials, cookie);
      break;
    default:
      // do nothing
      break;
  }
}

/**
 * Submit the user login request to Zephr.
 *
 * @param {{ email, password, redirectTo }} credentials The user's login credentials.
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
    try {
      // Get the user's profile.
      yield call(getProfile, cookie);
      // Get the user's account.
      yield call(getAccount, cookie);
      // Access the user profile retrieved from Zephr.
      const {
        firstName,
        lastName,
      } = yield select(getUserProfile);
      // If no profile information is found, redirect the user to complete their profile.
      if (! firstName && ! lastName) {
        history.push('/complete-profile');
      } else {
        // Else push the user to the redirect target.
        history.push(credentials.redirectTo);
      }
    } catch (error) {
      // Post the error message to the console.
      yield call(debug, error);
    }
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
    trackingId,
  } = response;

  if ('success' === status) {
    // Store the session data for later use.
    yield put(actionReceiveUserSession({ trackingId }));
    // Set the user's email verification state in the store to false on initial registration.
    yield put(actionReceiveUserRegistration());
    // Send the double opt-in verification link to the user's email address.
    try {
      yield call(zephrService.sendVerificationEmail, credentials.email);
      // Update the state to reflect the email being sent.
      yield put(actionSendUserVerificationEmail());
      // // Push the user to the confirmation page.
      history.push('/register/confirmation/');
    } catch (error) {
      // Post the error message to the console.
      yield call(debug, error);
    }
  } else {
    // Set the error state on the form.
    yield put(actionReceiveRegistrationError(response.type));
  }
}

/**
 * Use the session cookie set by logging in or registering a user with Zephr to retrieve
 * their profile and store their information in our Redux store.
 *
 * @param {string} sessionCookie The Zephr session cookie to be passed in the request's headers.
 */
export function* getProfile(sessionCookie) {
  // Get the user's profile.
  const profile = yield call(zephrService.getProfile, sessionCookie);

  // `null` will be returned if no profile can be found.
  if ('object' === typeof profile) {
    // Store user profile information.
    yield put(actionReceiveUserProfile(profile));
  }
}

/**
 * Use the session cookie set by login in or registering a user with Zephr to retrieve
 * their account and store their information in our Redux store.
 *
 * @param {string} sessionCookie The Zephr session cookie to be passed in the request's headers.
 */
export function* getAccount(sessionCookie) {
  // Get the user's account.
  const account = yield call(zephrService.getAccount, sessionCookie);

  // `null` will be returned if no account can be found.
  if ('object' === typeof account) {
    // Retrieve SFG account data from the nexus.
    try {
      const {
        orders,
        subscription_active: subscriptionActive,
        subscription_type: subscriptionType,
        subscription_expire_date: subscriptionExpiration,
      } = yield call(nexusService.getUser);

      // Store user account information.
      yield put(actionReceiveUserAccount({
        ...account,
        orders,
        subscriptionActive,
        subscriptionType,
        subscriptionExpiration,
      }));
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  }
}

/**
 * Send a password reset email to a given email address.
 *
 * @param {object} credentials The user's email address.
 */
function* submitResetRequest(credentials) {
  // Submit the form to Zephr.
  const { status, type } = yield call(zephrService.requestReset, credentials); // eslint-disable-line

  if ('success' === status) {
    history.push('/reset-password/request-confirmation/');
  }

  if ('failed' === status) {
    // yield put(actionReceiveResetRequestError(type));
  }
}

/**
 * Submit the user's new password to Zephr.
 *
 * @param {object} credentials The user's selected password.
 */
function* submitReset(credentials, cookie) {
  // Submit the form to Zephr.
  const { status, type } = yield call( // eslint-disable-line no-unused-vars
    zephrService.resetPassword,
    credentials,
    cookie
  );

  if ('success' === status) {
    history.push('/reset-password/confirmation/');
  }

  if ('failed' === status) {
    yield put(actionReceiveResetError(type));
  }
}
