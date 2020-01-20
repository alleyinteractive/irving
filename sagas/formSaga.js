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
} from 'actions/zephrActions';
import {
  REQUEST_SUBMIT,
  REQUEST_ZEPHR_FORMS,
  SUBMIT_ZEPHR_FORM,
} from 'actions/types';
import { getCached } from 'selectors/zephrSelector';

// @todo remove me. this mock is temporary
import loginFormMock from './loginFormMock.json';

const debug = createDebug('sagas:form');

export default [
  // Initialize the saga to request Zephr forms onload.
  call(initializeFormSaga),
  // Form action watchers.
  takeLatest(REQUEST_SUBMIT, watchRequestSubmit),
  takeLatest(REQUEST_ZEPHR_FORMS, requestZephrForms),
  takeEvery(SUBMIT_ZEPHR_FORM, submitZephrForm),
];

function* initializeFormSaga() {
  while (yield take(REHYDRATE)) {
    const isCached = yield select(getCached);

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
function submitZephrForm({ payload }) {
  const {
    type,
  } = payload;
  console.log(type);

  switch (type) {
    case 'login':
      // do something
      break;
    default:
      // do nothing
      break;
  }
}

function* requestLogin() {
  // Initiate the request.
  yield put(actionRequestForm({ route: 'login' }));

  // const params = {
  //   method: 'GET',
  //   path: '/v3/forms/login',
  //   body: '',
  // };
  // const header = yield call(zephrService.getRequestHeader, params);
  // console.log(header);

  const form = yield call(
    createZephrForm,
    {
      input: loginFormMock,
      submitText: 'Login',
    }
  );

  // Send the form to the store for recall.
  yield put(actionReceiveForm({ components: form, route: '/login' }));
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
      slug,
      fields,
    },
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
