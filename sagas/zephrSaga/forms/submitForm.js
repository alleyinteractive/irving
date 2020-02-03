import { call, put } from 'redux-saga/effects';
import {
  actionReceiveUserSession,
  actionReceiveUserProfile,
  actionReceiveLoginError,
  actionReceiveUserRegistration,
} from 'actions/zephrActions';
import zephrService from 'services/zephrService';
import history from 'utils/history';

/**
 * A generator that is called on the submission of a Zephr form. The form
 * type is checked and a subsequent request will be made to the cooresponding
 * endpoint in the Zephr API.
 *
 * @param {{ type, credentials }} The form to be submitted.
 */
export default function* submitForm({ payload: { type, credentials } }) {
  switch (type) {
    case 'login':
      yield call(submitLogin, credentials);
      break;
    case 'registration':
      yield call(submitRegistration, credentials);
      break;
    default:
      // do nothing
      break;
  }
}

/**
 * Submit the user login request to Zephr.
 *
 * @param {{ email, password }} credentials The user's login credentials.
 */
function* submitLogin(credentials) {
  // Submit the form to Zephr.
  const status = yield call(zephrService.login, credentials);

  if ('success' === status) {
    // On success parse the cookies set by Zephr's API response.
    const sessionData = parseCookies();

    // Store the session data for later use.
    yield put(actionReceiveUserSession(sessionData));
    // Get the user's profile and redirect.
    yield call(getProfile);
  } else {
    yield put(actionReceiveLoginError());
  }
}

/**
 * Submit the user's registration request to Zephr.
 *
 * @param {{ email, password, attributes }} credentials The user's registration credentials.
 */
function* submitRegistration(credentials) {
  // Submit the form to Zephr.
  const response = yield call(zephrService.register, credentials);
  const {
    status,
    cookie,
    trackingId,
  } = response;

  if ('success' === status) {
    // Store the session data for later use.
    yield put(actionReceiveUserSession({ sessionCookie: cookie, trackingId }));
    // Set the user's email verification state in the store to false on initial registration.
    yield put(actionReceiveUserRegistration());
    // Get the user's profile and redirect.
    yield call(getProfile);
  }
}

/**
 * Use the session cookie set by logging in or registering a user with Zephr to retrieve
 * their profile and store their information in our Redux store.
 */
function* getProfile() {
  // Get the user's profile.
  const profile = yield call(zephrService.getProfile);

  // `null` will be returned if no profile can be found.
  if ('object' === typeof profile) {
    // Store user profile information.
    yield put(actionReceiveUserProfile(profile));
    // Push the user to the homepage.
    history.push('/');
  }
}

/**
 * Parse the cookies set by the Zephr login response for storage in Redux.
 */
function parseCookies() {
  const cookieArr = document.cookie
    .split(';')
    .reduce((res, item) => {
      const [key, val] = item.trim().split('=').map(decodeURIComponent);
      const allNumbers = (str) => /^\d+$/.test(str);
      try {
        return Object.assign(
          res,
          {
            [key]: allNumbers(val) ? val : JSON.parse(val),
          }
        );
      } catch (e) {
        return Object.assign(res, { [key]: val });
      }
    }, {});

  const {
    blaize_session: sessionCookie,
    blaize_tracking_id: trackingId,
    blaize_meta: metaCookie,
  } = cookieArr;

  return { sessionCookie, trackingId, metaCookie };
}
