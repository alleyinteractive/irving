import {
  REQUEST_FORM_FOR_ROUTE,
  RECEIVE_FORM_FOR_ROUTE,
  RECEIVE_ZEPHR_USER_SESSION,
  RECEIVE_ZEPHR_USER_PROFILE,
  RECEIVE_USER_LOGIN,
  RECEIVE_LOGIN_ERROR,
  RECEIVE_PASSWORD_VERIFICATION_ERROR,
  RECEIVE_USER_REGISTRATION,
  RECEIVE_REGISTRATION_ERROR,
  RECEIVE_USER_LOG_OUT,
  RECEIVE_ZEPHR_USER_ACCOUNT,
  RECEIVE_ZEPHR_USER_VERIFICATION,
} from 'actions/types';
import React from 'react';
import { PERSIST, REHYDRATE } from 'redux-persist/lib/constants';
import { zephr as defaultState } from './defaultState';

/**
 * State container reducer for Zephr actions.
 * @param {object}   state   state container
 * @param {string}   type
 * @param {*}        payload
 * @returns {object}
 */
export default function zephrReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case PERSIST:
      return { ...state, isLoading: true };
    case REHYDRATE:
      return { ...state, isLoading: false };
    case REQUEST_FORM_FOR_ROUTE:
      return { ...state, isLoading: true };
    case RECEIVE_FORM_FOR_ROUTE:
      return {
        ...state,
        isLoading: false,
        forms: {
          ...state.forms,
          ...payload,
        },
        cached: true,
      };
    case RECEIVE_ZEPHR_USER_SESSION:
      return {
        ...state,
        session: {
          ...state.session,
          payload,
        },
      };
    case RECEIVE_ZEPHR_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: payload,
        },
      };
    case RECEIVE_ZEPHR_USER_ACCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          account: payload,
        },
      };
    case RECEIVE_USER_LOGIN:
      return {
        ...state,
        forms: {
          ...state.forms,
          login: {
            ...state.forms.login,
            error: false,
            errors: [],
            errorCount: null,
          },
        },
      };
    case RECEIVE_LOGIN_ERROR:
      return {
        ...state,
        forms: {
          ...state.forms,
          login: {
            ...setFormErrorState(state.forms.login, payload),
          },
        },
      };
    case RECEIVE_USER_REGISTRATION:
      return {
        ...state,
        forms: {
          ...state.forms,
          register: {
            ...state.forms.register,
            error: false,
            errors: [],
            errorCount: null,
          },
        },
        user: {
          ...state.user,
          emailVerified: false,
        },
      };
    case RECEIVE_REGISTRATION_ERROR:
      return {
        ...state,
        forms: {
          ...state.forms,
          register: {
            ...setFormErrorState(state.forms.register, payload),
          },
        },
      };
    case RECEIVE_PASSWORD_VERIFICATION_ERROR:
      // This error needs to be thrown separately from the generic form error state so
      // that the error state can be applied to both password fields on the registration form.
      return {
        ...state,
        forms: {
          ...state.forms,
          register: {
            ...setPasswordErrorState(state.forms.register),
          },
        },
      };
    case RECEIVE_USER_LOG_OUT:
      return {
        ...state,
        session: defaultState.session,
        user: defaultState.user,
      };
    case RECEIVE_ZEPHR_USER_VERIFICATION:
      return {
        ...state,
        user: {
          ...state.user,
          emailVerified: true,
        },
      };
    default:
      return state;
  }
}

/**
 * A function that is run any time a form is submitted that cleans up the state of a
 * submitted form that contains errors. If no errors are present, the form is returned.
 *
 * @param {object} state   The current state.
 * @param {string} route   The form's route (e.g. /login).
 *
 * @returns {object} form  The cleared form.
 */
function clearFormErrors(form) { // eslint-disable-line
  if (! form.error) {
    return form;
  }

  // Remove any errors
  const components = form.components.map((el) => {
    if (true === el.props.invalid) {
      return {
        ...el,
        props: {
          ...el.props,
          invalid: false,
        },
      };
    }

    return el;
  });

  const componentKeys = components.map((el) => el.key);

  const activeErrorIndexes = componentKeys.map(
    (key, index) => {
      if (key.includes('error-message')) {
        return index;
      }
      return null;
    }
  ).filter((index) => null !== index);

  while (activeErrorIndexes.length) {
    components.splice(activeErrorIndexes.pop(), 1);
  }

  return {
    ...form,
    error: false,
    errors: [],
    components,
  };
}

/**
 * Set the error state for an invalid login attempt.
 *
 * @param {object} form     The current form.
 * @param {string} error    The type of error returned from Zephr.
 *
 * @return {object} newForm The transformed form with errors.
 */
function setFormErrorState(form, error) {
  // Prevent the same error from being added to the form multiple times.
  if (true === form.error && form.errors.includes(error)) {
    const errorCount = form.errorCount + 1;

    return {
      ...form,
      errorCount,
      requireCaptcha: 2 < errorCount,
    };
  }

  // Get the error's target input.
  const targetId = setErrorTargetId(error);
  // Get the target's position in the components array.
  const targetPos = form.components.map(
    (el) => {
      if (el) {
        return el.props.id;
      }
      return null;
    }
  ).indexOf(targetId);
  // Get the target.
  const target = form.components[targetPos];
  // Add the error state to the target.
  const erroredTarget = {
    ...target,
    props: {
      ...target.props,
      invalid: true,
    },
  };
  // Replace the component with the error state.
  form.components.splice(
    targetPos,
    1,
    erroredTarget,
  );

  // Create the error message component.
  const errorMessage = React.createElement(
    'span',
    {
      id: `${targetId}-error`,
      key: `${targetId}-error-message`,
      className: 'form-error',
    },
    formatErrorMessage(error),
  );
  // Add the error message to the components array.
  form.components.splice(targetPos + 1, 0, errorMessage);

  let newForm = {};
  // Check to see if the form is already in an error state.
  if ('errorCount' in form) {
    // Get the current error count.
    const errorCount = form.errorCount + 1;

    newForm = {
      ...form,
      errors: [
        ...form.errors,
        error,
      ],
      errorCount,
      requireCaptcha: 2 < errorCount,
    };
  } else {
    // Otherwise build the form with the initial error state.
    newForm = {
      ...form,
      error: true,
      errors: [error],
      errorCount: 1,
      requireCaptcha: false,
    };
  }

  return newForm;
}

/**
 * A function that identifies a given component ID to have and error state
 * applied based on the error type.
 *
 * @param {string} type The error type.
 *
 * @returns {string} The target component's ID.
 */
function setErrorTargetId(type) {
  switch (type) {
    case 'user-not-found':
      return 'email-address';
    case 'invalid-password':
      return 'current-password';
    case 'email-address':
      return 'email-address';
    case 'full-name':
      return 'full-name';
    case 'terms-checkbox':
      return 'terms-checkbox';
    default:
      return null;
  }
}

/**
 * A function that formats the error message to be displayed a below an invalid form
 * input based on the error type.
 *
 * @param {string} type The error type.
 *
 * @returns {string} The error message.
 */
/* eslint-disable max-len */
function formatErrorMessage(type) {
  const messageBase = 'Oops! Let’s try that again';

  switch (type) {
    case 'user-not-found':
      return `${messageBase} — User not found. Please enter your email address.`;
    case 'invalid-password':
      return `${messageBase} — Invalid password. Please enter your password.`;
    case 'verify-password':
      return `${messageBase} — Passwords do not match. Please re-enter your password and try again.`;
    case 'full-name':
      return `${messageBase} — Please enter your full name.`;
    case 'email-address':
      return `${messageBase} — Please enter a valid email address.`;
    case 'terms-checkbox':
      return `${messageBase} — You must agree to the terms of service in order to create an account.`;
    default:
      return messageBase;
  }
}
/* eslint-enable */

/**
 * A function that formats the error state for the password inputs on the registration form.
 *
 * @param {object} form   The current form.
 *
 * @returns {object} form The transformed form.
 */
function setPasswordErrorState(form) {
  // Create an array of available component IDs.
  const idMap = form.components.map((el) => el.props.id);

  // Get the password input's position in the array.
  const passwordInputPos = idMap.indexOf('new-password');
  const passwordInput = form.components[passwordInputPos];
  // Create the password input with an error state.
  const erroredPasswordInput = {
    ...passwordInput,
    props: {
      ...passwordInput.props,
      invalid: true,
    },
  };
  // Replace the component with the error state.
  form.components.splice(
    passwordInputPos,
    1,
    erroredPasswordInput,
  );

  // Get the verification input's position in the array.
  const verifyInputPos = idMap.indexOf('verify-password');
  const verifyInput = form.components[verifyInputPos];
  // Create the verification input with an error state.
  const erroredVerifyInput = {
    ...verifyInput,
    props: {
      ...verifyInput.props,
      invalid: true,
    },
  };
  // Replace the component with the error state.
  form.components.splice(
    verifyInputPos,
    1,
    erroredVerifyInput,
  );
  // Create the error message component.
  const errorMessage = React.createElement(
    'span',
    {
      key: 'password-verification-error-message',
      className: 'form-error',
    },
    formatErrorMessage('verify-password'),
  );

  // Add the error message to the components array.
  form.components.splice(verifyInputPos + 1, 0, errorMessage);

  return {
    ...form,
    error: true,
  };
}
