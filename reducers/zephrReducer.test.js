import React from 'react';
import { merge } from 'lodash/fp';
import {
  actionReceiveLoginError,
  actionReceiveRegistrationError,
} from 'actions/zephrActions';
import defaultState from './defaultState';
import reducer from './zephrReducer';

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

describe('Zephr Reducer', () => {
  describe('Login actions', () => {
    it('Should invalidate the email address field when an incorrect email is entered', () => {
      const mockState = merge(defaultState, {
        forms: {
          login: loginFormDefaultState,
        },
      });

      const components = [...loginFormDefaultState.components];
      const input = components[0];
      const inputWithErrorState = {
        ...input,
        props: {
          ...input.props,
          invalid: true,
        },
      }
      // Replace the component with the error state.
      components.splice(0, 1, inputWithErrorState);
      // Splice the error message into the components array.
      const error = React.createElement(
        'span',
        {
          id: `email-address-error`,
          key: `email-address-error-message`,
          className: 'form-error',
        },
        'Oops! Let’s try that again — User not found. Please enter your email address.',
      );
      components.splice(1, 0, error);

      const newState = reducer(mockState, actionReceiveLoginError('user-not-found'));
      expect(newState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          login: {
            components,
            error: true,
            errors: ['user-not-found'],
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

      const components = [...loginFormDefaultState.components];
      const input = components[1];
      const inputWithErrorState = {
        ...input,
        props: {
          ...input.props,
          invalid: true,
        },
      }
      // Replace the component with the error state.
      components.splice(1, 1, inputWithErrorState);
      // Splice the error message into the components array.
      const error = React.createElement(
        'span',
        {
          id: `current-password-error`,
          key: `current-password-error-message`,
          className: 'form-error',
        },
        'Oops! Let’s try that again — Invalid password. Please enter your password.',
      );
      components.splice(2, 0, error);

      const newState = reducer(mockState, actionReceiveLoginError('invalid-password'));
      expect(newState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          login: {
            components,
            error: true,
            errors: ['invalid-password'],
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

      const components = [...regFormDefaultState.components];
      const position = 0;
      const input = components[position];
      const inputWithErrorState = {
        ...input,
        props: {
          ...input.props,
          invalid: true,
        },
      }
      // Replace the component with the error state.
      components.splice(position, 1, inputWithErrorState);
      // Splice the error message into the components array.
      const error = React.createElement(
        'span',
        {
          id: `email-address-error`,
          key: `email-address-error-message`,
          className: 'form-error',
        },
        'Oops! Let’s try that again — Please enter a valid email address.',
      );
      components.splice(position + 1, 0, error);

      const newState = reducer(mockState, actionReceiveRegistrationError('email-address'));
      expect(newState).toEqual({
        ...mockState,
        forms: {
          ...mockState.forms,
          register: {
            components,
            error: true,
            errors: ['email-address'],
            errorCount: 1,
            requireCaptcha: false,
          },
        },
      });
    });
  })
});
