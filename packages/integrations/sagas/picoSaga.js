import {
  takeLatest,
  call,
  put,
  select,
  take,
  fork,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from '@irvingjs/core/actions/types';
import {
  picoLoadedSelector,
  picoPageInfoSelector,
} from '../selectors/picoSelector';
import { SEND_PICO_VERIFICATION_REQUEST } from '../actions/types';
import { actionReceivePicoVerificationFailure } from '../actions/picoActions';
import {
  actionReceiveCoralToken,
  actionReceiveCoralUsernameRequest,
  actionReceiveCoralUsernameValidationFailure,
  actionReceiveCoralUsernameSetHash,
} from '../actions/coralActions';

function* takeFirst(pattern, saga, ...args) {
  const task = yield fork(function* () {
    while (true) {
      const action = yield take(pattern);

      yield call(saga, ...args.concat(action));
    }
  });

  return task;
}

// The Pico saga.
export default [
  takeLatest(LOCATION_CHANGE, dispatchPicoVisit),
  takeFirst(SEND_PICO_VERIFICATION_REQUEST, verifyPicoCoralUser),
];

function* dispatchPicoVisit() {
  const picoLoaded = yield select(picoLoadedSelector);
  const picoPageInfo = yield select(picoPageInfoSelector);

  if (picoLoaded && picoPageInfo) {
    window.pico('visit', picoPageInfo);
  }
}

/**
 * A generator that dispatches the verification request to the Pico data
 * endpoint and dispatches subsequent Redux actions based on the success/failure
 * status of the response.
 * @param {{ email }} The user's email to be dispatched in a verification request.
 */
function* verifyPicoCoralUser({ payload }) {
  const {
    status,
    jwt,
    require_username: requireUsername,
    validation_error: validationError,
    username_set_hash: usernameSetHash,
  } = yield call(sendVerificationRequest, payload);

  if ('success' === status) {
    if (requireUsername) {
      yield put(actionReceiveCoralUsernameRequest());
      yield put(actionReceiveCoralUsernameSetHash(usernameSetHash));
    } else {
      yield put(actionReceiveCoralToken(jwt));
    }
  }

  if ('failed' === status) {
    if (validationError) {
      yield put(actionReceiveCoralUsernameValidationFailure(validationError));
    } else {
      yield put(actionReceivePicoVerificationFailure());
    }
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
      id,
    } = payload;

    const response = await fetch(
      `${process.env.API_ROOT_URL}/data/validate_sso_user?user=${email}&id=${id}` // eslint-disable-line max-len
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
