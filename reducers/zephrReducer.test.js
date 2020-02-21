/* eslint-disable max-len */
import { merge } from 'lodash/fp';
import {
  actionReceiveLoginError,
  actionReceiveRegistrationError,
  actionReceiveInvalidPassword,
} from 'actions/zephrActions';
import defaultState from './defaultState';
import reducer, {
  setFormErrorState,
  setPasswordErrorState,
} from './zephrReducer';

// Default login form state to be modified in the test suite.
const loginFormMock = {
  components: JSON.stringify([
    {
      autoComplete: 'username',
      className: 'zephr-input-email-address',
      defaultValue: '',
      id: 'email-address',
      placeholder: 'Enter your email address',
      required: false,
      type: 'email',
    },
    {
      autoComplete: 'current-password',
      className: 'zephr-input-current-password',
      defaultValue: '',
      id: 'current-password',
      placeholder: 'Enter your password',
      required: true,
      type: 'password',
    },
    {
      id: 'submit-button',
      key: 'zephr-submit-button',
      type: 'submit',
      value: 'Login',
    }
  ]),
  error: false,
  errors: [],
  errorCount: null,
};

// Default registration form state to be modified in the test suite.
const regFormMock = {
  components: JSON.stringify([
    {
      autoComplete: 'username',
      className: 'zephr-input-email-address',
      defaultValue: '',
      id: 'email-address',
      placeholder: 'Enter your email address',
      required: false,
      type: 'email',
    },
    {
      className: 'zephr-input-full-name',
      defaultValue: '',
      id: 'full-name',
      placeholder: 'Enter your full name',
      required: true,
      type: 'text',
    },
    {
      autoComplete: 'new-password',
      className: 'zephr-input-new-password',
      defaultValue: '',
      id: 'new-password',
      placeholder: 'Create a password for your account',
      required: true,
      type: 'password',
    },
    {
      autoComplete: 'new-password',
      className: 'zephr-input-verify-password',
      defaultValue: '',
      id: 'verify-password',
      placeholder: 'Confirm your password',
      required: true,
      type: 'password',
    },
    {
      id: 'terms-checkbox',
    },
    {
      id: 'submit-button',
      key: 'zephr-submit-button',
      type: 'submit',
      value: 'Create an account',
    },
  ]),
  error: false,
  errors: [],
  errorCount: null,
};

/**
 * A helper function that takes a given form type, the clean form's state,
 * the target error, and the mocked state and tests whether or not the error
 * applied by the `setFormErrorState` function produces the same results as
 * the effects of a dispatched error action.
 *
 * @param {*} type      The form type.
 * @param {*} formState The (clean) form's state.
 * @param {*} error     The error to be tested.
 * @param {*} mockState The mocked state object.
 */
function compareFormState(type, formState, error, mockState) {
  const components = setFormErrorState(formState, error);

  // Run the action and return the modified state.
  let nextState = {};
  if ('login' === type) {
    nextState = reducer(mockState, actionReceiveLoginError(error))

    expect(nextState).toEqual({
      ...mockState,
      forms: {
        ...mockState.forms,
        [type]: {
          components,
          error: true,
          errors: [error],
          errorCount: 1,
          requireCaptcha: false,
        },
      },
    });
  } else if ('register' === type) {
    nextState = reducer(mockState, actionReceiveRegistrationError(error))

    expect(nextState).toEqual({
      ...mockState,
      forms: {
        ...mockState.forms,
        [type]: {
          components,
          error: true,
          errors: [error],
        },
      },
    });
  }
}

describe('Zephr Reducer', () => {
  describe('Login errors', () => {
    it('Should invalidate the email address field when an incorrect email is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          login: loginFormMock,
        },
      });
      const error = 'user-not-found';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('login', loginFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveLoginError(error));
      expect(nextState).toMatchSnapshot();
    });

    it('Should invalidate the email address field when an unverified email is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          login: loginFormMock,
        },
      });
      const error = 'email-not-verified';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('login', loginFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveLoginError(error));
      expect(nextState).toMatchSnapshot();
    });

    it('Should invalidate the password field when an incorrect password is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          login: loginFormMock,
        },
      });
      const error = 'invalid-password';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('login', loginFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveLoginError(error));
      expect(nextState).toMatchSnapshot();
    });

    it('Should require a reCAPTCHA field to be filled out if a failed attempt is made 3 or more times', () => {
      const mockState = merge(defaultState, {
        forms: {
          login: {
            ...loginFormMock,
            error: true,
            errorCount: 2,
            requireCaptcha: false,
          },
        },
      });
      const error = 'user-not-found';
      const components = setFormErrorState(loginFormMock, error);

      // Run the action and return the modified state.
      const nextState = reducer(mockState, actionReceiveLoginError(error));
      expect(nextState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          login: {
            components,
            error: true,
            errors: [error],
            errorCount: 3,
            requireCaptcha: true,
          },
        },
      });
    });
  });

  describe('Registration errors', () => {
    it('Should invalidate the email address field when an invalid email is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          register: regFormMock,
        },
      });
      const error = 'email-address';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('register', regFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveRegistrationError(error));
      expect(nextState).toMatchSnapshot();
    });

    it('Should invalidate the email address field when an existing account email is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          register: regFormMock,
        },
      });
      const error = 'user-already-exists';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('register', regFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveRegistrationError(error));
      expect(nextState).toMatchSnapshot();
    });

    it('Should invalidate the full name field when an invalid name is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          register: regFormMock,
        },
      });
      const error = 'full-name';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('register', regFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveRegistrationError(error));
      expect(nextState).toMatchSnapshot();
    });

    it('Should invalidate the password field when a weak password is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          register: regFormMock,
        },
      });
      const error = 'password-not-strong';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('register', regFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveRegistrationError(error));
      expect(nextState).toMatchSnapshot();
    });

    it('Should invalidate the password and verification fields when the passwords do not match', () => {
      const mockState = merge(defaultState, {
        forms: {
          register: regFormMock,
        },
      });
      const components = setPasswordErrorState(regFormMock);

      const nextState = reducer(mockState, actionReceiveInvalidPassword())
      expect(nextState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          register: {
            components,
            error: true,
            errors: ['verify-password'],
          },
        },
      });
      expect(nextState).toMatchSnapshot();
    });

    it('Should invalidate the terms of service checkbox if not checked', () => {
      const mockState = merge(defaultState, {
        forms: {
          register: regFormMock,
        },
      });
      const error = 'terms-checkbox';
      // Compare the state of manually errored form components and those formatted by the action.
      compareFormState('register', regFormMock, error, mockState);

      // Create/compare a snapshot.
      const nextState = reducer(mockState, actionReceiveRegistrationError(error));
      expect(nextState).toMatchSnapshot();
    });
  });
});
