import React from 'react';
import {
  FormInput,
  // TermsCheckbox
} from './components/formElements';

export default function toFormElements(form) {
  const components = JSON.parse(form);

  return components.map((component) => {
    const {
      id,
      key,
      type,
      className,
    } = component;

    const props = {
      key: component.className,
      ...component,
    };

    switch (type) {
      case 'email':
      case 'password':
        return React.createElement(
          FormInput,
          props,
          null
        );
      case 'span':
        return React.createElement(
          'span',
          { id, key, className },
          component.message
        );
      case 'submit':
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
