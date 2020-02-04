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
      return submitForm(state, payload.route);
    case RECEIVE_USER_LOGIN:
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
    case RECEIVE_LOGIN_ERROR:
      return setFormErrorState(state, '/login', payload);
    case RECEIVE_USER_REGISTRATION:
      return {
        ...state,
        forms: [
          ...state.forms.map((form) => {
            if ('/register' === form.route && true === form.error) {
              return {
                ...form,
                error: false,
                errorCount: null,
              };
            }

            return form;
          }),
        ],
        user: {
          ...state.user,
          emailVerified: false,
        },
      };
    case RECEIVE_REGISTRATION_ERROR:
      return setFormErrorState(state, '/register', payload);
    case RECEIVE_PASSWORD_VERIFICATION_ERROR:
      // This error needs to be thrown separately from the generic form error state so
      // that the error state can be applied to both password fields on the registration form.
      return setPasswordErrorState(state);
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
 * @returns {object} state The transformed state.
 */
function submitForm(state, route) {
  return {
    ...state,
    forms: [
      ...state.forms.map((form) => {
        if (form.route === route && true === form.error) {
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

          // Find any error messages in the component map.
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
 * @param {object} state     Current state.
 * @param {string} route     The form's route (e.g. /login).
 * @param {string} errorType The type of error returned from Zephr.
 *
 * @return {object} state    Transformed state.
 */
function setFormErrorState(state, route, errorType) {
  return {
    ...state,
    forms: [
      ...state.forms.map((form) => {
        if (route === form.route) {
          // Get the error's target input.
          const targetId = setErrorTargetId(errorType);
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
              'aria-invalid': true,
            },
          };
          console.log(erroredTarget);
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
            formatErrorMessage(errorType),
          );
          // Add the error message to the components array.
          form.components.splice(targetPos + 1, 0, errorMessage);

          // Check to see if the form is already in an error state.
          if ('errorCount' in form) {
            // Get the current error count.
            const { errorCount } = form;

            return {
              ...form,
              errorCount: errorCount + 1,
              requireCaptcha: 1 <= errorCount,
            };
          }

          return {
            ...form,
            error: true,
            errorCount: 1,
            requireCaptcha: false,
          };
        }

        return form;
      }),
    ],
  };
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
 * @param {object} state The current state.
 *
 * @returns {object} state The transformed state.
 */
function setPasswordErrorState(state) {
  return {
    ...state,
    forms: [
      ...state.forms.map((form) => {
        if ('/register' === form.route && false === form.error) {
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
              'aria-invalid': true,
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
              'aria-invalid': true,
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

        return form;
      }),
    ],
  };
}
