/* eslint-disable */
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  actionReceiveUserLogin,
  actionRequestAuth,
  actionReceiveUserAuth,
  actionReceiveRequestHeader,
} from 'actions/userActions';
import * as userActions from 'actions/userActions';
import {
  authSelector,
  isValid as isAuthValid,
  validTo,
  authHeader,
} from 'selectors/getAuth';
import createDebug from 'services/createDebug';
import nexusService from 'services/nexusService';
import { INITIATE_USER_LOGIN } from '../actions/types';

const debug = createDebug('sagas:login');

export default [
  takeEvery(INITIATE_USER_LOGIN, validateEmailAddress),
];

function* getRequestHeader() {
  let header = yield select(authHeader);

  if (0 >= header.length) {
    const response = yield call(nexusService.getRequestHeader);
    header = response.header; // eslint-disable-line prefer-destructuring
    yield put(actionReceiveRequestHeader(response))
  }

  return header;
}

function* validateEmailAddress({ payload: { email } }) {
  const header = yield call(getRequestHeader);
  console.log(email, header);

  try {
    const response = yield call(nexusService.getAccount, { email, header });
    yield put(actionReceiveUserLogin({ ...response, email }));
    console.log(response);

    if (0 < response.username.length) {
      window.location.pathname = '/login/verified';
    }
  } catch (error) {
    yield call(debug, error);
  }
}

function* authorize({ payload: { password }}) {
  const hasAuth = yield select(isAuthValid);
  const timeLimit = yield select(validTo);
  const timestamp = Math.floor(Date.now() / 1000);
  const isValid = hasAuth && timestamp < timeLimit;

  try {
    if (! isValid) {
      const header = yield call(getRequestHeader);
      const username = yield call(getUsername);
  
      yield put(actionRequestAuth());

      const session = yield call(
        nexusService.newSession, { username, password, header }
      );

      if (false !== session.isValid) {
        // Store session data.
        yield put(actionReceiveUserAuth(session));
        // Login the user.
        yield call(login, { id: session.id, password, header });
      } else {
        // @todo define error state.
        throw new Error('Session request failed: ', session);
      }
      return session;
    }
  } catch (error) {
    yield call(debug, error);
  }

  // User already exists
  return yield select(authSelector);
}

function* login({ id, password }) {
  const header = yield call(getHeader);

  try {
    const response = yield call(nexusService.login, { id, password, header });

    if ('authenticated' === response.status) {
      window.location.pathname = '/';
    }
  } catch (error) {
    yield call(debug, error);
  }
}

