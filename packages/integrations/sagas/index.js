import { takeEvery, call, put } from 'redux-saga/effects';
import { SEND_PICO_VERIFICATION_REQUEST } from '../actions/types';
import { actionReceiveCoralToken } from '../actions';

export default [
  takeEvery(SEND_PICO_VERIFICATION_REQUEST, verifyPicoUser),
];

function* verifyPicoUser({ payload }) {
  const { status, jwt } = yield call(sendVerificationRequest, payload);

  if ('success' === status) {
    yield put(actionReceiveCoralToken(jwt));
  }

  if ('failed' === status) {
    // dispatch fail.
  }
}

async function sendVerificationRequest(payload) {
  try {
    const {
      email,
    } = payload;

    const request = fetch(
      `${process.env.API_ROOT_URL}/data/verify_pico_user?user=${email}`
    ).then((res) => res.json());

    const response = await request;

    return response;
  } catch (error) {
    // Log the error to the developer console.
    console.error(
      'There was an error trying to verify the Pico user credentials: ',
      error
    );
  }

  return false;
}
