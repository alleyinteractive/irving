import { call, put } from 'redux-saga/effects';
import { actionReceiveUserLogin } from 'actions/userActions';
import createDebug from 'services/createDebug';

const debug = createDebug('sagas:login');

export default function* loginFlow(data) {
  const {
    payload: { email },
  } = data;

  // Make the request to connect to Nexus here.
  try {
    const response = yield call(async (userEmail) => {
      console.log(`${userEmail} is trying to login.`); // eslint-disable-line
      return true;
    }, email);

    yield put(actionReceiveUserLogin(response));
  } catch (error) {
    yield call(debug, error);
  }
}
