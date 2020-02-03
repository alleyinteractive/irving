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
  SUBMIT_ZEPHR_FORM,
} from 'actions/types';
import React from 'react';
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
    case SUBMIT_ZEPHR_FORM:
      return submitForm(state, payload.type);
    case RECEIVE_USER_LOGIN:
      return setLoginFormState(state);
    case RECEIVE_LOGIN_ERROR:
      return setLoginFormErrorState(state, payload);
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

function submitForm(state, type) {
  return {
    ...state,
    forms: [
      ...state.forms.map((form) => {
        if (form.route === `/${type}` && true === form.error) {
          // Remove any errors
          const componentMap = form.components.map((el) => {
            if (true === el.props['aria-invalid']) {
              return {
                ...el,
                props: {
                  ...el.props,
                  'aria-invalid': false,
                },
              };
            }

            return el;
          });

          // Find any error messages in the components array.
          const messagePos = form.components.map(
            (el) => el.type
          ).indexOf('span');
          // Remove the component.
          componentMap.splice(messagePos, 1);

          return {
            ...form,
            components: componentMap,
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
 * @param {object} state
 * @param {string} errorType
 */
function setLoginFormErrorState(state, errorType) {
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
              requireCaptcha: 2 <= errorCount,
            };
          }

          // Get the error's target input.
          const targetId = setErrorTargetId(errorType);
          // Get the target's position in the components array.
          const targetPos = form.components.map(
            (el) => el.props.id
          ).indexOf(targetId);
          // Get the target.
          const target = form.components[targetPos];
          // Add the error state to the target.
          const erroredTarget = {
            ...target,
            props: {
              ...target.props,
              'aria-invalid': true,
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
              key: `${targetId}-error-message`,
              className: 'form-error',
            },
            formatErrorMessage(errorType),
          );
          // Add the error message to the components array.
          form.components.splice(targetPos + 1, 0, errorMessage);

          return {
            ...form,
            error: true,
            errorCount: 1,
            errorMessage: formatErrorMessage(errorType),
            requireCaptcha: false,
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

function setErrorTargetId(type) {
  switch (type) {
    case 'user-not-found':
      return 'email-address';
    case 'invalid-password':
      return 'current-password';
    default:
      return null;
  }
}

/* eslint-disable max-len */
function formatErrorMessage(type) {
  const messageBase = 'Oops! Let’s try that again';

  switch (type) {
    case 'user-not-found':
      return `${messageBase} — User not found. Please enter your email address.`;
    case 'invalid-password':
      return `${messageBase} — Invalid password. Please enter your password.`;
    default:
      return messageBase;
  }
}
/* eslint-enable */
