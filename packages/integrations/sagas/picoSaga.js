import { takeLatest, call, put } from 'redux-saga/effects';
import { SEND_PICO_VERIFICATION_REQUEST } from '../actions/types';
import {
  actionReceiveCoralToken,
  actionReceivePicoVerificationFailure,
} from '../actions';

// The Pico saga.
export default [
  takeLatest(SEND_PICO_VERIFICATION_REQUEST, verifyPicoUser),
];

/**
 * A generator that dispatches the verification request to the Pico data
 * endpoint and dispatches subsequent Redux actions based on the success/failure
 * status of the response.
 * @param {{ email }} The user's email to be dispatched in a verification request.
 */
function* verifyPicoUser({ payload }) {
  const { status, jwt } = yield call(sendVerificationRequest, payload);

  if ('success' === status) {
    yield put(actionReceiveCoralToken(jwt));
  }

  if ('failed' === status) {
    yield put(actionReceivePicoVerificationFailure());
  }
}

/**
 * Send a verification request to the Pico data endpoint and return
 * a status/JWT pair on success.
 * @param {{ email }} The user's email to verify.
 * @returns {Object} response - The API response.
 */
async function sendVerificationRequest(payload) {
  try {
    const {
      email,
    } = payload;

    const response = await fetch(
      `${process.env.API_ROOT_URL}/data/validate_sso_user?user=${email}`
    ).then((res) => res.json());

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
