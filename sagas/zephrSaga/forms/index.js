import {
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {
  actionRequestForms,
  actionReceiveUserLogOut,
  actionReceiveEmailUpdateError,
  actionRequestEmailUpdateError,
  actionReceiveEmailUpdateSuccess,
  actionRequestEmailConfirmationError,
  actionRequestEmailConfirmationSuccess,
} from 'actions/zephrActions';
import {
  REQUEST_ZEPHR_FORMS,
  SUBMIT_ZEPHR_FORM,
  REQUEST_USER_LOG_OUT,
  REQUEST_UPDATE_EMAIL,
  REQUEST_EMAIL_CONFIRMATION,
  RECEIVE_UPDATE_EMAIL,
  SUBMIT_PROFILE,
} from 'actions/types';
import { getCached, getSession, getZephrCookie } from 'selectors/zephrSelector';
import zephrService from 'services/zephrService';
import history from 'utils/history';
import requestForms from './requestForms';
import submitForm, { getProfile, getAccount } from './submitForm';

export default [
  // Initialize the saga to request Zephr forms onload.
  call(initialize),
  // Listen for form request.
  takeEvery(REQUEST_ZEPHR_FORMS, requestForms),
  // Listen for form submit.
  takeEvery(SUBMIT_ZEPHR_FORM, submitForm),
  // Listen for user log out request.
  takeEvery(REQUEST_USER_LOG_OUT, logOut),
  // Listen for every update email request.
  takeEvery(REQUEST_UPDATE_EMAIL, submitUpdateEmailRequest),
  // Listen for every request to send email to updated email inbox for confirmation.
  takeEvery(REQUEST_EMAIL_CONFIRMATION, submitRequestEmailConfirmation),
  // Listen for user submit email update request.
  takeEvery(RECEIVE_UPDATE_EMAIL, submitUpdateEmail),
  // Listen for profile completion for SSO accounts.
  takeEvery(SUBMIT_PROFILE, completeProfile),
];

/**
 * A generator that is called on the initialization of the saga.
 */
function* initialize() {
  // Only execute after the Redux store has been rehydrated.
  while (yield take(REHYDRATE)) {
    // Check to see if cached forms exist in the rehydrated store.
    const isCached = yield select(getCached);

    // If there are no forms cached, reach out to the Zephr API and request
    // available forms.
    if (! isCached) {
      yield put(actionRequestForms());
    }
  }
}

/**
 * A generator that is called when a user requests a log out.
 */
function* logOut() {
  const session = yield select(getSession);
  const status = yield call(zephrService.logOut, session);

  if ('success' === status) {
    // Update the redux store and clear out any stored user data.
    yield put(actionReceiveUserLogOut());
    // Redirect the user to the login page.
    history.push('/login/');
  }
}

/**
 * A generator that is run when a user registers an account using a
 * third-party single sign-on (SSO) service. Zephr does not return profile
 * information from these services, so we need to ensure they fill out
 * the rest of the required information prior to being able to access
 * their account.
 */
function* completeProfile({ payload }) {
  const { sessionCookie } = yield select(getSession);

  const status = yield call(
    zephrService.updateProfile,
    {
      properties: payload,
      cookie: sessionCookie,
    }
  );

  if ('success' === status) {
    // Get the user's profile from Zephr.
    yield call(getProfile, sessionCookie);
    // Get the user's account info from Zephr.
    yield call(getAccount, sessionCookie);
    // Redirect the user to the homepage.
    history.push('/');
  }
}

/**
 * Send a new email to update the users email address.
 *
 * @param {object} credentials The user's email address.
 */
function* submitUpdateEmailRequest(credentials) {
  const cookie = yield select(getZephrCookie);
  // Submit the form to Zephr.
  const { status, type } = yield call(
    zephrService.requestUpdateEmail,
    credentials.payload,
    cookie,
  );

  // Update the users' profile to show new email address.
  yield call(getAccount, cookie);

  if ('success' === status) {
    // Navigate to the confirmation page.
    history.push('/email-update/request');
  }

  if ('failed' === status) {
    yield put(actionRequestEmailUpdateError(type));
  }
}

/**
 * Submit the user's password to send an email to the users newly update email's inbox.
 *
 * @param {object} credentials The user's selected password.
 */
function* submitRequestEmailConfirmation(credentials) {
  const cookie = yield select(getZephrCookie);
  // Submit the form to Zephr.
  const { status, type } = yield call(
    zephrService.requestUpdateEmailConfirmation,
    credentials.payload,
    cookie,
  );

  // Update the users' profile to show new email address.
  yield call(getAccount, cookie);

  if ('success' === status) {
    yield put(actionRequestEmailConfirmationSuccess(type));
  }

  if ('failed' === status) {
    yield put(actionRequestEmailConfirmationError(type));
  }
}

/**
 * Submit the user's password to confirm the update of the new email to Zephr.
 *
 * @param {object} credentials The user's selected password.
 */
function* submitUpdateEmail(credentials) {
  const cookie = yield select(getZephrCookie);

  // Submit the form to Zephr.
  const { status, type } = yield call(
    zephrService.updateEmail,
    credentials.payload,
    cookie,
  );

  // Update the users' profile to show new email address.
  yield call(getAccount, cookie);

  if ('success' === status) {
    yield put(actionReceiveEmailUpdateSuccess(type));
  }

  if ('failed' === status) {
    yield put(actionReceiveEmailUpdateError(type));
  }
}
