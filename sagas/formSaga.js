import { call, put } from 'redux-saga/effects';
import {
  actionReceiveSubmitted,
  actionReceiveSubmitError,
  actionReceiveSubmitInvalid,
} from 'actions/formActions';
import submitForm from 'services/submitForm';
import createDebug from 'services/createDebug';
import React from 'react';

const debug = createDebug('sagas:form');

export default function* watchRequestSubmit(data) {
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
