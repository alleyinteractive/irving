import { call, put } from 'redux-saga/effects';
import { actionReceiveUserLogin } from 'actions/userActions';
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
    // Call Nexus
    const response = yield call(nexusService.getAccount, email);
    yield put(actionReceiveUserLogin(response));
  } catch (error) {
    yield call(debug, error);
  }
}
