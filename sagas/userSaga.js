/* eslint-disable */
import { call, put, select } from 'redux-saga/effects';
import { actionReceiveUserLogin } from 'actions/userActions';
import { isValid, authHeader } from 'selectors/getAuth';
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
    const isAuthHeaderValid = yield select(isValid);

    if (false === isAuthHeaderValid) {
      const auth = yield call(nexusService.getAuth);

      if (false !== auth.isValid) {
        // yield put(actionReceiveUserAuth(auth));
        const response = yield call(nexusService.getAccount, { email, header: auth.header });
        yield put(actionReceiveUserLogin(response));
      } else {
        console.info('There was a problem verifying the authorization header.') // eslint-disable-line no-console
      }
    } else {
      const header = yield select(authHeader);
      const response = yield call(nexusService.getAccount, { email, header });
      yield put(actionReceiveUserLogin(response));
    }
  } catch (error) {
    yield call(debug, error);
  }
}
