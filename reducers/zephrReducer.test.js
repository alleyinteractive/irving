import React from 'react';
import { merge } from 'lodash/fp';
import {
  actionReceiveLoginError,
  actionReceiveRegistrationError,
  actionReceiveInvalidPassword,
} from 'actions/zephrActions';
import defaultState from './defaultState';
import reducer, {
  setErrorTargetId,
  formatErrorMessage,
  setPasswordErrorState,
} from './zephrReducer';

// Default login form state to be modified in the test suite.
const loginFormDefaultState = {
  components: [
    {
      key: 'zephr-input-email-address',
      ref: null,
      props: {
        id: 'email-address',
        className: 'zephr-input-email-address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: false,
        defaultValue: '',
        autoComplete: 'username',
        children: null,
        invalid: false,
      },
    },
    {
      key: 'zephr-input-current-password',
      ref: null,
      props: {
        id: 'current-password',
        className: 'zephr-input-current-password',
        type: 'password',
        placeholder: 'Enter your password',
        required: true,
        defaultValue: '',
        autoComplete: 'current-password',
        children: null,
        invalid: false,
      },
    },
    {
      type: 'input',
      key: 'zephr-submit-button',
      ref: null,
      props: {
        type: 'submit',
        value: 'Login',
        children: null,
      },
    },
  ],
  error: false,
  errors: [],
  errorCount: null,
};

// Default registration form state to be modified in the test suite.
const regFormDefaultState = {
  components: [
    {
      key: 'zephr-input-email-address',
      ref: null,
      props: {
        id: 'email-address',
        className: 'zephr-input-email-address',
        type: 'email',
        placeholder: 'Enter your email address',
        required: false,
        defaultValue: '',
        autoComplete: 'username',
        children: null,
        invalid: false,
      },
    },
    {
      key: 'zephr-input-full-name',
      ref: null,
      props: {
        id: 'full-name',
        className: 'zephr-input-full-name',
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
        defaultValue: '',
        autoComplete: '',
        children: null,
        invalid: false,
      },
    },
    {
      key: 'zephr-input-new-password',
      ref: null,
      props: {
        id: 'new-password',
        className: 'zephr-input-new-password',
        type: 'password',
        placeholder: 'Create a password for your account',
        required: true,
        defaultValue: '',
        autoComplete: 'new-password',
        children: null,
        invalid: false,
      },
    },
    {
      key: null,
      ref: null,
      props: {
        id: 'verify-password',
        className: 'zephr-input-verify-password',
        type: 'password',
        placeholder: 'Confirm your password',
        required: true,
        defaultValue: '',
        autoComplete: 'new-password',
        children: null,
        invalid: false,
      },
    },
    {
      key: null,
      ref: null,
      props: {
        id: 'terms-checkbox',
        children: null,
      },
    },
    {
      type: 'input',
      key: 'zephr-submit-button',
      ref: null,
      props: {
        type: 'submit',
        value: 'Create this account',
        children: null,
      },
    },
  ],
  error: false,
  errors: [],
  errorCount: null,
};

/**
 * A helper function that takes the components array from a Zephr form,
 * formats the input associated with a given error with an invalid state,
 * and attaches the associated error message to the components array.
 *
 * @param {array} components   The components array without errors.
 * @param {number} position    The target input's position in the components array.
 * @param {string} error       The given error.
 * 
 * @returns {array} components The modified components array. 
 */
function formatComponentsWithError(components, position, error) {
  // Create a new components array to avoid mutation.
  const comp = [...components];
  const input = comp[position];
  const inputWithErrorState = {
    ...input,
    props: {
      ...input.props,
      invalid: true,
    },
  };
  // Get the target's id.
  const id = setErrorTargetId(error);
  // Replace the component with the error state.
  comp.splice(position, 1, inputWithErrorState);
  // Splice the error message into the components array.
  const errorMessage = React.createElement(
    'span',
    {
      id: `${id}-error`,
      key: `${id}-error-message`,
      className: 'form-error',
    },
    formatErrorMessage(error),
  );
  comp.splice(position + 1, 0, errorMessage);
  // Return the modified components array.
  return comp;
}

describe('Zephr Reducer', () => {
  describe('Login actions', () => {
    it('Should invalidate the email address field when an incorrect email is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          login: loginFormDefaultState,
        },
      });
      const error = 'user-not-found';
      const position = 0;
      const components = formatComponentsWithError(
        loginFormDefaultState.components,
        position,
        error
      );

      // Run the action and return the modified state.
      const newState = reducer(mockState, actionReceiveLoginError(error));
      expect(newState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          login: {
            components,
            error: true,
            errors: [error],
            errorCount: 1,
            requireCaptcha: false,
          },
        },
      });
    });

    it('Should invalidate the password field when an incorrect password is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          login: loginFormDefaultState,
        },
      });
      const error = 'invalid-password';
      const position = 1;
      const components = formatComponentsWithError(
        loginFormDefaultState.components,
        position,
        error
      );

      // Run the action and return the modified state.
      const newState = reducer(mockState, actionReceiveLoginError(error));
      expect(newState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          login: {
            components,
            error: true,
            errors: [error],
            errorCount: 1,
            requireCaptcha: false,
          },
        },
      });
    });
  });

  describe('Registration actions', () => {
    it('Should invalidate the email address field when an invalid email is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          register: regFormDefaultState,
        },
      });
      const error = 'email-address';
      const position = 0;
      const components = formatComponentsWithError(
        regFormDefaultState.components,
        position,
        error
      );

      const newState = reducer(mockState, actionReceiveRegistrationError(error));
      expect(newState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          register: {
            components,
            error: true,
            errors: [error],
            errorCount: 1,
            requireCaptcha: false,
          },
        },
      });
    });
  });

  it('Should invalidate the full-name field when an invalid name is entered', () => {
    const mockState = merge(defaultState, {
      forms: {
        register: regFormDefaultState,
      },
    });
    const error = 'full-name';
    const position = 1;
    const components = formatComponentsWithError(
      regFormDefaultState.components,
      position,
      error
    );

    const newState = reducer(mockState, actionReceiveRegistrationError(error));
    expect(newState).toEqual({
      ...mockState,
      forms: {
        ...mockState.forms,
        register: {
          components,
          error: true,
          errors: [error],
          errorCount: 1,
          requireCaptcha: false,
        },
      },
    });
  });

  // it('Should invalidate the new-password field when an invalid password is entered', () => {});

  // it('Should invalidate both password fields when the passwords to not match', () => {
  //   const mockState = merge(defaultState, {
  //     forms: {
  //       register: regFormDefaultState,
  //     },
  //   });
  //   const { components } = setPasswordErrorState(regFormDefaultState);

  //   const newState = reducer(mockState, actionReceiveInvalidPassword());
  //   expect(newState).toEqual({
  //     ...mockState,
  //     forms: {
  //       ...mockState.forms,
  //       register: {
  //         components,
  //         error: true,
  //         errors: ['verify-password'],
  //         errorCount: 1,
  //         requireCaptcha: false,
  //       },
  //     },
  //   });
  // });

  it('Should invalidate the checkbox field if the TOS checkbox has not been checked', () => {
    const mockState = merge(defaultState, {
      forms: {
        register: regFormDefaultState,
      },
    });
    const error = 'terms-checkbox';
    const position = 4;
    const components = formatComponentsWithError(
      regFormDefaultState.components,
      position,
      error
    );

    const newState = reducer(mockState, actionReceiveRegistrationError(error));
    expect(newState).toEqual({
      ...mockState,
      forms: {
        ...mockState.forms,
        register: {
          components,
          error: true,
          errors: [error],
          errorCount: 1,
          requireCaptcha: false,
        },
      },
    });
  });
});
