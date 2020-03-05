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
} from 'actions/zephrActions';
import {
  REQUEST_ZEPHR_FORMS,
  SUBMIT_ZEPHR_FORM,
  REQUEST_USER_LOG_OUT,
  REQUEST_UPDATE_EMAIL,
  RECEIVE_UPDATE_EMAIL,
} from 'actions/types';
import { getCached, getSession } from 'selectors/zephrSelector';
import zephrService from 'services/zephrService';
import history from 'utils/history';
import requestForms from './requestForms';
import submitForm from './submitForm';

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
  // Listen for user submit email update request.
  takeEvery(RECEIVE_UPDATE_EMAIL, submitUpdateEmail),
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
    history.push('/login');
  }
}

/**
 * Send a new email to update the users email address.
 *
 * @param {object} credentials The user's email address.
 */
function* submitUpdateEmailRequest(credentials) {
  // Submit the form to Zephr.
  const { status, type } = yield call(zephrService.requestUpdateEmail, credentials.payload); // eslint-disable-line

  if ('success' === status) {
    history.push('/email-update/request');
  }

  if ('failed' === status) {
    console.log('status ', status);
  }
}

/**
 * Submit the user's password to confirm the update of the new email to Zephr.
 *
 * @param {object} credentials The user's selected password.
 */
function* submitUpdateEmail(credentials, cookie) {
  // Submit the form to Zephr.
  const { status, type } = yield call( // eslint-disable-line no-unused-vars
    zephrService.updateEmail,
    credentials.payload,
    cookie
  );

  if ('success' === status) {
    // @TODO: Once Zephr has added a new email template to their email settings,
    // we'll need to send the user to the confirmation page.
    // history.push('/email-update/confirmation');
  }

  if ('failed' === status) {
    // yield put(actionReceiveResetError(type));
  }
}
