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
} from 'actions/zephrActions';
import createDebug from 'services/createDebug';
import history from 'utils/history';
import {
  getAccount,
  getProfile,
} from '../forms/submitForm';

const debug = createDebug('sagas:ssoSaga');

export default [
  takeEvery(RECEIVE_SSO_SESSION, completeSignOn),
];

function* completeSignOn({ payload: cookie }) {
  // Store the session data for later use.
  yield put(actionReceiveUserSession({ sessionCookie: cookie }));
  // Set the user's login state and clean up any existing error state on the form.
  yield put(actionReceiveUserLogin());
  try {
    // Get the user's profile.
    yield call(getProfile, cookie);
    // Get the user's account.
    yield call(getAccount, cookie);
    // Push the user to the homepage.
    setTimeout(() => {
      history.push('/');
    }, 2000);
  } catch (error) {
    // Post the error message to the console.
    yield call(debug, error);
  }
}
