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
  SUBMIT_ZEPHR_FORM,
  RECEIVE_RESET_PASSWORD_ERROR,
} from 'actions/types';
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
    case SUBMIT_ZEPHR_FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          [payload.type]: submitForm(state.forms[payload.type]),
        },
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
            components: setFormErrorState(state.forms.register, payload),
            error: true,
            errors: [
              ...state.forms.register.errors,
              payload,
            ],
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
          [payload]: {
            ...state.forms[payload],
            components: setPasswordErrorState(state.forms[payload]),
            error: true,
            errors: ['verify-password'],
          },
        },
      };
    case RECEIVE_RESET_PASSWORD_ERROR:
      return {
        ...state,
        forms: {
          ...state.forms,
          reset: {
            ...state.forms.reset,
            components: setFormErrorState(state.forms.reset, payload),
            error: true,
            errors: [payload],
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
 * A function that is run on form submission. Cleans the form of any errors
 * and applies a loading state to the submit button.
 *
 * @param {object} form The submitted form.
 *
 * @returns {object} form
 */
function submitForm(form) {
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

  const withLoadState = components.map((el) => {
    if ('submit-button' === el.id) {
      return {
        ...el,
        value: 'Loading...',
      };
    }

    return el;
  });

  return {
    ...form,
    components: JSON.stringify(withLoadState),
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
export function setFormErrorState(form, error) {
  // Prevent the same error from being added to the form multiple times.
  if (form.error && form.errors.includes(error)) {
    return form.components;
  }

  // Get the component fields.
  const fields = JSON.parse(form.components);
  // Remove any existing errors.
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

  let value = 'Submit';
  switch (form.type) {
    case 'login':
      value = 'Login';
      break;
    case 'register':
      value = 'Create an account';
      break;
    case 'requestReset':
      value = 'Send password reset link';
      break;
    case 'reset':
      value = 'Change your password';
      break;
    default:
      break;
  }

  return JSON.stringify(
    components.map((el) => {
      if ('submit-button' === el.id) {
        return {
          ...el,
          value,
        };
      }

      return el;
    })
  );
}

/**
 * A function that formats the error state for the password inputs on the registration form.
 *
 * @param {object} form   The current form.
 *
 * @returns {object} form The transformed form.
 */
export function setPasswordErrorState(form) {
  // Get the component fields.
  const fields = JSON.parse(form.components);
  // Get the components.
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

  // Define the error.
  const error = 'verify-password';
  // Get the target's position in the components array.
  const position = components.map((el) => el.id).indexOf('new-password');
  // Get the password input.
  const passwordInput = components[position];
  // Update the input's state.
  const passwordInputWithError = {
    ...passwordInput,
    invalid: true,
  };
  components.splice(position, 1, passwordInputWithError);

  // Get the verification input.
  const verificationInput = components[position + 1];
  // Update the input's state.
  const verificationInputWithError = {
    ...verificationInput,
    invalid: true,
  };
  components.splice(position + 1, 1, verificationInputWithError);

  // Create the error message.
  const message = {
    type: 'span',
    id: 'verify-password-error',
    key: 'verify-password-error-message',
    className: 'form-error',
    message: formatErrorMessage(error),
  };
  // Add the error message to the components array.
  components.splice(position + 2, 0, message);

  let value = 'Submit';
  switch (form.type) {
    case 'login':
      value = 'Login';
      break;
    case 'register':
      value = 'Create an account';
      break;
    case 'requestReset':
      value = 'Send password reset link';
      break;
    case 'reset':
      value = 'Change your password';
      break;
    default:
      break;
  }

  return JSON.stringify(
    components.map((el) => {
      if ('submit-button' === el.id) {
        return {
          ...el,
          value,
        };
      }

      return el;
    })
  );
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
    case 'email-address':
      return type;
    case 'email-not-verified':
      return 'email-address';
    case 'full-name':
      return type;
    case 'invalid-password':
      return 'current-password';
    case 'password-not-strong':
      return 'new-password';
    case 'terms-checkbox':
      return type;
    case 'user-already-exists':
      return 'email-address';
    case 'user-not-found':
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
    case 'email-address':
      return `${messageBase} — Please enter a valid email address.`;
    case 'email-not-verified':
      return `${messageBase} — Your email has not yet been verified. Please check your inbox for a verification email and try again.`;
    case 'full-name':
      return `${messageBase} — Please enter your full name.`;
    case 'invalid-password':
      return `${messageBase} — Invalid password. Please enter your password.`;
    case 'password-not-strong':
      return `${messageBase} — Your password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one symbol (e.g. !#$%&).`;
    case 'terms-checkbox':
      return `${messageBase} — You must agree to the terms of service in order to create an account.`;
    case 'user-already-exists':
      return `${messageBase} — Account already exists!`;
    case 'user-not-found':
      return `${messageBase} — User not found. Please enter your email address.`;
    case 'verify-password':
      return `${messageBase} — Passwords do not match. Please re-enter your password and try again.`;
    default:
      return messageBase;
  }
}
/* eslint-enable */
