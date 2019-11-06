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
} from 'selectors/getAuth';
import createDebug from 'services/createDebug';
import nexusService from 'services/nexusService';

const debug = createDebug('sagas:login');

// @todo needs to handle more than just someone requesting login.
// I found this tutorial helpful: https://github.com/sotojuan/saga-login-flow
export default function* loginFlow(data) {
  const {
    payload: { email },
  } = data;

  try {
    const { header } = yield call(authorize);

    const response = yield call(nexusService.getAccount, { email, header });
    yield put(actionReceiveUserLogin(response));
  } catch (error) {
    yield call(debug, error);
  }
}

// @todo implement me in the login flow.
export function* authorize() {
  const isValid = yield select(isAuthValid);
  const timestamp = yield select(validTo);
  const timeLimit = Math.floor(Date.now() / 1000) - 300;

  try {
    if (false === isValid || timestamp > timeLimit) {
      yield put(actionRequestAuth());

      const auth = yield call(nexusService.getAuth);
      if (false !== auth.isValid) {
        yield put(actionReceiveUserAuth(auth));
      } else {
        // @todo define error state.
        throw new Error('Request failed', auth);
      }

      return auth;
    }
  } catch (error) {
    console.info('There was a problem while requesting authorization.', error); // eslint-disable-line no-console
  }

  return yield select(authSelector);
}

