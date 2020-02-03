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
} from 'actions/types';
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
    case REQUEST_FORM_FOR_ROUTE:
      return { ...state, isLoading: true };
    case RECEIVE_FORM_FOR_ROUTE:
      return {
        ...state,
        isLoading: false,
        forms: [...state.forms, payload],
        cached: true,
      };
    case RECEIVE_ZEPHR_USER_SESSION:
      return {
        ...state,
        session: payload,
      };
    case RECEIVE_ZEPHR_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: payload,
        },
      };
    case RECEIVE_USER_LOGIN:
      return setLoginFormState(state);
    case RECEIVE_LOGIN_ERROR:
      return setLoginFormErrorState(state);
    case RECEIVE_USER_REGISTRATION:
      return setRegistrationFormState(state);
    case RECEIVE_REGISTRATION_ERROR:
      return setRegistrationFormErrorState(state);
    case RECEIVE_PASSWORD_VERIFICATION_ERROR:
      return setRegistrationFormErrorState({
        ...state,
        type: 'password-verification-error',
      });
    default:
      return state;
  }
}

/**
 * Set login form state. Clean up if an error state exists.
 *
 * @param {*} state
 */
function setLoginFormState(state) {
  return {
    ...state,
    forms: [
      ...state.forms.map((form) => {
        if ('/login' === form.route && true === form.error) {
          return {
            ...form,
            error: false,
            errorCount: null,
          };
        }

        return form;
      }),
    ],
  };
}

/**
 * Set the error state for an invalid login attempt.
 *
 * @param {*} state
 */
function setLoginFormErrorState(state) {
  return {
    ...state,
    forms: [
      ...state.forms.map((form) => {
        if ('/login' === form.route) {
          // Check to see if the form is already in an error state.
          if ('errorCount' in form) {
            // Get the current error count.
            const { errorCount } = form;

            return {
              ...form,
              errorCount: errorCount + 1,
              requireCaptcha: 2 < errorCount,
            };
          }

          // Add aria-invalid state to form components
          const components = form.components.map((component) => ({
            ...component,
            props: {
              ...component.props,
              'aria-invalid': true,
            },
          }));

          const errorMessage = `Oops! Let’s try that again —
          please enter your email address and password.`;

          return {
            ...form,
            components,
            error: true,
            errorCount: 1,
            errorMessage,
          };
        }

        return form;
      }),
    ],
  };
}

/**
 * Set registration form state. Clean up if an error state exists.
 *
 * @param {*} state
 */
function setRegistrationFormState(state) {
  return {
    ...state,
    user: {
      ...state.user,
      emailVerified: false,
    },
  };
}

/**
 * Set the error state for an invalid registration attempt.
 *
 * @param {*} state
 */
function setRegistrationFormErrorState(state) {
  // do something
  console.log(state);
}
