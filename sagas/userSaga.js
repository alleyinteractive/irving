/* eslint-disable */
import { call, put, select } from 'redux-saga/effects';
import {
  actionReceiveUserLogin,
  actionRequestAuth,
  actionReceiveUserAuth,
} from 'actions/userActions';
import { authSelector, isValid, validTo } from 'selectors/getAuth';
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
    const { header } = yield select(authSelector);
    const response = yield call(nexusService.getAccount, { email, header });
    yield put(actionReceiveUserLogin(response));
  } catch (error) {
    yield call(debug, error);
  }
}

