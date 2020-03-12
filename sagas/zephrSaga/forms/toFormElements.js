import React from 'react';
import Link from 'components/helpers/link';
import {
  FormInput,
  TermsCheckbox,
} from './components/formElements';

export default function toFormElements(fields, type) {
  return JSON.parse(fields).map((component) => {
    const {
      id,
      key,
      className,
    } = component;

    const props = {
      key: component.className,
      ...component,
    };

    switch (id) {
      case 'email-address':
      case 'current-password':
      case 'full-name':
      case 'new-password':
      case 'verify-password':
        return React.createElement(
          FormInput,
          props,
          null
        );
      case 'terms-checkbox':
        return React.createElement(
          TermsCheckbox,
          {
            key: 'zephr-terms-checkbox',
            props,
          },
          null
        );
      case 'email-address-error':
      case 'current-password-error':
      case 'full-name-error':
      case 'new-password-error':
      case 'verify-password-error':
      case 'terms-checkbox-error':
        return React.createElement(
          'span',
          { id, key, className },
          component.message
        );
      case 'submit-button':
        if ('login' === type) {
          return React.createElement('div',
            { className: 'zephr-form-button-group' },
            React.createElement('input', props, null),
            React.createElement(Link, {
              className: 'forgot-password-link',
              to: '/reset-password/',
            },
            'Forgot your password?'));
        }

        return React.createElement(
          'input',
          props,
          null
        );
      default:
        return null;
    }
  });
}
