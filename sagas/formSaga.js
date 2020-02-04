import {
  all,
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  actionReceiveSubmitted,
  actionReceiveSubmitError,
  actionReceiveSubmitInvalid,
} from 'actions/formActions';
import submitForm from 'services/submitForm';
import createDebug from 'services/createDebug';
import { REHYDRATE } from 'redux-persist/lib/constants';
import React from 'react';
import {
  actionRequestForms,
  actionRequestForm,
  actionReceiveForm,
  actionReceiveUserSession,
  actionReceiveUserProfile,
  actionReceiveLoginError,
} from 'actions/zephrActions';
import {
  REQUEST_SUBMIT,
  REQUEST_ZEPHR_FORMS,
  SUBMIT_ZEPHR_FORM,
} from 'actions/types';
import { getCached } from 'selectors/zephrSelector';
import zephrService from 'services/zephrService';
import history from 'utils/history';

const debug = createDebug('sagas:form');

export default [
  // Initialize the saga to request Zephr forms onload.
  call(initializeFormSaga),
  // Form action watchers.
  takeLatest(REQUEST_SUBMIT, watchRequestSubmit),
  takeLatest(REQUEST_ZEPHR_FORMS, requestZephrForms),
  takeEvery(SUBMIT_ZEPHR_FORM, submitZephrForm),
];

/**
 * A generator that is called on the initialization of the saga.
 */
function* initializeFormSaga() {
  // Only execute after the Redux store has been rehydrated.
  while (yield take(REHYDRATE)) {
    // Check to see if cached forms exist in the rehydrated store.
    const isCached = yield select(getCached);

    // If there are no forms cached, reach out to the Zephr API and request
    // available forms.
    if (! isCached) {
      yield put(actionRequestForms());
    }
  }
}

function* watchRequestSubmit(data) {
  const {
    payload: { formName, submission },
  } = data;

  try {
    const response = yield call(submitForm, formName, submission);
    if (response && response.validation) {
      yield put(actionReceiveSubmitInvalid(formName, response.validation));
    } else {
      yield put(actionReceiveSubmitted(formName, response));
    }
  } catch (err) {
    yield put(actionReceiveSubmitError(formName, err));
    yield call(debug, err);
  }
}

/**
 * A generator that will request each Zephr form available to the app
 * and cache it in the Redux store for future use.
 */
export function* requestZephrForms() {
  yield all([
    call(requestLogin),
  ]);
}

/**
 * A generator that is called on the submission of a Zephr form. The form
 * type is checked and a subsequent request will be made to the cooresponding
 * endpoint in the Zephr API.
 *
 * @param {payload} The action payload.
 */
function* submitZephrForm({ payload }) {
  const {
    type,
  } = payload;

  switch (type) {
    case 'login':
      yield call(submitLogin, payload.credentials);
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

    const sessionData = { sessionCookie, trackingId, metaCookie };

    // Store the session data for later use.
    yield put(actionReceiveUserSession(sessionData));

    // Get the user's profile.
    const profile = yield call(zephrService.getProfile);

    // `null` will be returned if no profile can be found.
    if ('object' === typeof profile) {
      // Store user profile information.
      yield put(actionReceiveUserProfile(profile));
      // Push the user to the homepage.
      history.push('/');
    }
  } else {
    yield put(actionReceiveLoginError());
  }
}

function* requestLogin() {
  // Initiate the request.
  yield put(actionRequestForm({ route: 'login' }));

  const formResponse = yield call(zephrService.getForm, 'login_form');

  const form = yield call(
    createZephrForm,
    {
      input: formResponse,
      submitText: 'Login',
    }
  );

  // Send the form to the store for recall.
  yield put(actionReceiveForm({
    components: form,
    route: '/login',
    error: false,
  }));
}

/**
 * Construct a form via a response from the Zephr API.
 *
 * @param {object} input Stringified JSON input from Zephr API.
 *
 * @returns {array} Array of React elements to use in the Zephr form.
 */
export function createZephrForm(payload) {
  const {
    input: {
      slug = '',
      fields = [],
    } = {},
    submitText,
  } = payload;

  // Map the fields to React components.
  const components = fields.map((field) => {
    const {
      slug: id,
      placeholder,
      required,
      'default-value': defaultValue,
    } = field;

    let type = '';
    switch (id) {
      case 'email-address':
        type = 'email';
        break;
      case 'password':
        type = 'password';
        break;
      default:
        type = 'text';
    }

    let props = {
      key: id,
      id,
      className: `zephr-input-${id}`,
      type,
      placeholder,
      required,
      defaultValue,
    };

    if ('email-address' === id) {
      props = { ...props, autoComplete: 'username' };
    }

    if ('password' === id) {
      const autoComplete =
        'registration' === slug ? 'new-password' : 'current-password';

      props = { ...props, autoComplete };
    }

    return React.createElement('input', props, null);
  });

  const buttonProps = {
    key: 'zephr-submit-button',
    type: 'submit',
    value: submitText,
  };

  // Create the submit button.
  const submitButton = React.createElement('input', buttonProps, null);

  // Append the submit button to the end of the array.
  components.push(submitButton);

  // Return the components array.
  return components;
}
