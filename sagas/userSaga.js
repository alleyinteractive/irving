/* eslint-disable */
import { call, put, select } from 'redux-saga/effects';
import {
  actionReceiveUserLogin,
  actionRequestAuth,
  actionReceiveUserAuth,
} from 'actions/userActions';
import {
  authSelector,
  isValid as isAuthValid,
  validTo,
  authHeader,
} from 'selectors/getAuth';
import createDebug from 'services/createDebug';
import nexusService from 'services/nexusService';

const debug = createDebug('sagas:login');

// @todo create a takeLatest or takeEvery effect pattern to create action responders instead
// of chaining actions together inside of a generator. If I'm not the person that does this,
// look here for the deets: https://redux-saga.js.org/docs/api/#takepattern

// @todo needs to handle more than just someone requesting login.
// I found this tutorial helpful: https://github.com/sotojuan/saga-login-flow
export default function* loginFlow(data) {
  const {
    payload: { email },
  } = data;

  try {
    yield call(login, { id: 1, password: 'test' });
    // yield call(validateEmailAddress, email);
  } catch (error) {
    yield call(debug, error);
  }
}

function* validateEmailAddress(email) {
  const header = yield call(getHeader);

  try {
    const response = yield call(nexusService.getAccount, { email, header });
    yield put(actionReceiveUserLogin(response));
  } catch (error) {
    yield call(debug, error);
  }
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

function* getHeader() {
  let header = yield select(authHeader);

  if (0 >= header.length) {
    const response = yield call(authorize);
    header = response.header; // eslint-disable-line prefer-destructuring
  }

  return header;
}

// @todo implement me in the login flow.
export function* authorize({ username, password }) { // eslint-disable-line
  const hasAuth = yield select(isAuthValid);
  const timeLimit = yield select(validTo);
  const timestamp = Math.floor(Date.now() / 1000);
  const isValid = hasAuth && timestamp < timeLimit;

  try {
    if (! isValid) {
      yield put(actionRequestAuth());

      const session = yield call(
        nexusService.newSession, { username, password }
      );

      if (false !== session.isValid) {
        yield put(actionReceiveUserAuth(session));
      } else {
        // @todo define error state.
        throw new Error('Session request failed: ', session);
      }
      return session;
    }
  } catch (error) {
    yield call(debug, error);
  }

  return yield select(authSelector);
}

