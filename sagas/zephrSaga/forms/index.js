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
  SUBMIT_PROFILE,
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
    history.push('/login');
  }
}

function* completeProfile({ payload }) {
  const session = yield select(getSession);

  yield call(
    zephrService.updateProfile,
    {
      properties: payload,
      cookie: session,
    }
  );
}
