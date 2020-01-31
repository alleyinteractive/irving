
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
  ]);
}

function* requestLogin() {
  // Initiate the request.
  yield put(actionRequestForm({ route: 'login' }));

  const formResponse = yield call(zephrService.getForm, 'login_form');

  const form = yield call(
    createForm,
    {
      input: formResponse,
      submitText: 'Login',
    }
  );

  // Send the form to the store for recall.
  yield put(actionReceiveForm({
    components: form,
    route: '/login',
    error: false,
  }));
}

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
    components: form,
    route: '/register',
    error: false,
  }));
}
