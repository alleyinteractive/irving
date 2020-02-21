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
            components: setFormErrorState(state.forms.login, payload),
            error: true,
            errors: [
              ...state.forms.login.errors,
              payload,
            ],
            errorCount: state.forms.login.errorCount + 1,
            requireCaptcha: 3 < state.forms.login.errorCount + 2,
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

  // Get the component fields.
  const fields = JSON.parse(form.components);
  // Remove any errors
  const components = fields.map((el) => {
    if (true === el.invalid) {
      return {
        ...el,
        invalid: false,
      };
    }

    return el;
  });
  // Retrieve the position of any active error message.
  const activeErrorIndexes = components.map(
    (component, index) => {
      const { key } = component;
      if (key && key.includes('error-message')) {
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
    components: JSON.stringify(components),
  };
}

/**
 * Set the error state for an invalid login attempt.
 *
 * @param {object} form  The current form.
 * @param {string} error The type of error returned from Zephr.
 *
 * @return {object} form The transformed form with errors.
 */
function setFormErrorState(form, error) {
  // Prevent the same error from being added to the form multiple times.
  if (form.error && form.errors.includes(error)) {
    return form.components;
  }

  let obj = form;
  if (form.error) {
    obj = clearFormErrors(form);
  }

  // Get the components.
  const components = JSON.parse(obj.components);
  // Get the targer's ID.
  const targetId = setErrorTargetId(error);
  // Get the target's position in the components array.
  const position = components.map((el) => el.id).indexOf(targetId);
  // Get the target.
  const target = components[position];
  // Update the target's state.
  const targetWithError = {
    ...target,
    invalid: true,
  };
  components.splice(position, 1, targetWithError);
  // Create the error message.
  const message = {
    type: 'span',
    id: `${targetId}-error`,
    key: `${targetId}-error-message`,
    className: 'form-error',
    message: formatErrorMessage(error),
  };
  // Add the error message to the components array.
  components.splice(position + 1, 0, message);

  return JSON.stringify(components);
}

/**
 * A function that formats the error state for the password inputs on the registration form.
 *
 * @param {object} form   The current form.
 *
 * @returns {object} form The transformed form.
 */
export function setPasswordErrorState(form) {
  // Get the components.
  const { components } = form;
  // Get the password input's position in the array.
  const position = components.map(
    (el) => {
      if (el) {
        return el.props.id;
      }
      return null;
    }
  ).indexOf('new-password');
  const input = components[position];
  // Create the password input with an error state.
  const erroredInput = {
    ...input,
    props: {
      ...input.props,
      invalid: true,
    },
  };
  // Replace the component with the error state.
  components.splice(
    position,
    1,
    erroredInput,
  );
  // The error is specific to this function.
  const error = 'verify-password';
  // Format the target input and attach the appropriate error message.
  const formWithError = attachErrorToForm(form, error, error);
  // Get the current error count and increment.
  const errorCount = formWithError.errorCount + 1;

  return {
    ...formWithError,
    error: true,
    errors: [
      ...formWithError.errors,
      error,
    ],
    errorCount,
  };
}

/**
 * A function that takes a given Zephr form, the error target, and the error
 * type and formats the components with an error state and attaches an error
 * message to the components array in the appropriate position.
 *
 * @param {object} form        The form.
 * @param {string} id          The error target's ID.
 * @param {string} error       The error type.
 *
 * @returns {array} components The formatted components.
 */
function attachErrorToForm(form, id, error) {
  // Get the components.
  const { components } = form;
  // Get the target's position in the components array.
  const position = components.map(
    (el) => {
      if (el) {
        return el.props.id;
      }
      return null;
    }
  ).indexOf(id);
  // Get the target.
  const target = components[position];
  // Add the error state to the target.
  const targetWithError = {
    ...target,
    props: {
      ...target.props,
      invalid: true,
    },
  };
  // Replace the component with the error state.
  components.splice(
    position,
    1,
    targetWithError,
  );
  // Create the error message component.
  const errorMessage = React.createElement(
    'span',
    {
      id: `${id}-error`,
      key: `${id}-error-message`,
      className: 'form-error',
    },
    formatErrorMessage(error),
  );
  // Add the error message to the components array.
  components.splice(position + 1, 0, errorMessage);
  // Return the formatted components.
  return components;
}

/**
 * A function that identifies a given component ID to have and error state
 * applied based on the error type.
 *
 * @param {string} type The error type.
 *
 * @returns {string} The target component's ID.
 */
export function setErrorTargetId(type) {
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
    case 'email-not-verified':
      return 'email-address';
    case 'password-not-strong':
      return 'new-password';
    case 'user-already-exists':
      return 'email-address';
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
export function formatErrorMessage(type) {
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
    case 'email-not-verified':
      return `${messageBase} — Your email has not yet been verified. Please check your inbox for a verification email and try again.`;
    default:
      return messageBase;
  }
}
/* eslint-enable */
