
import {
  all,
  call,
  put,
} from 'redux-saga/effects';
import {
  actionRequestForm,
  actionReceiveForm,
} from 'actions/zephrActions';
import zephrService from 'services/zephrService';
import createForm from './createForm';

/**
 * A generator that will request each Zephr form available to the app
 * and cache it in the Redux store for future use.
 */
export default function* requestForms() {
  yield all([
    call(requestLogin),
    call(requestRegistration),
    call(requestReset),
    call(buildResetForm),
  ]);
}

/**
 * A generator the requests the login form from Zephr to be stored in the Redux
 * store for later use.
 */
function* requestLogin() {
  // Initiate the request.
  yield put(actionRequestForm({ route: 'login' }));

  const formResponse = yield call(zephrService.getForm, 'login_form');

  const form = yield call(
    createForm,
    {
      input: formResponse,
      submitText: 'Sign in',
    }
  );

  // Send the form to the store for recall.
  yield put(actionReceiveForm({
    login: {
      type: 'login',
      components: JSON.stringify(form),
      error: false,
      errors: [],
      errorCount: null,
    },
  }));
}

/**
 * A generator that requests the registration form from Zephr to be stored in the Redux
 * store for later use.
 */
function* requestRegistration() {
  yield put(actionRequestForm({ route: 'register' }));

  const formResponse = yield call(zephrService.getForm, 'registration_form');

  const form = yield call(
    createForm,
    {
      input: formResponse,
      submitText: 'Create this account',
    }
  );

  // Send the form to the store for recall.
  yield put(actionReceiveForm({
    register: {
      type: 'register',
      components: JSON.stringify(form),
      error: false,
      errors: [],
      errorCount: null,
    },
  }));
}

/**
 * A generator the requests the password reset request form from Zephr to be stored in the Redux
 * store for later use.
 */
function* requestReset() {
  yield put(actionRequestForm({ route: 'reset' }));

  const formResponse = yield call(zephrService.getForm, 'password_reset');

  const form = yield call(
    createForm,
    {
      input: formResponse,
      submitText: 'Send password reset link',
      inline: true,
    }
  );

  yield put(actionReceiveForm({
    resetRequest: {
      type: 'resetRequest',
      components: JSON.stringify(form),
      error: false,
      errors: [],
      errorCount: null,
    },
  }));
}

/**
 * A generator that builds the pasword reset form to be stored in the Redux
 * for later use.
 */
function* buildResetForm() {
  const form = yield call(
    createForm,
    {
      input: {
        slug: 'reset',
        fields: [],
        resetForm: true,
      },
      submitText: 'Reset your password',
    }
  );

  yield put(actionReceiveForm({
    reset: {
      type: 'reset',
      components: JSON.stringify(form),
      error: false,
      errors: [],
      errorCount: null,
    },
  }));
}
