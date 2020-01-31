import React from 'react';

/**
 * Construct a form via a response from the Zephr API.
 *
 * @param {object} formJSON Stringified JSON input from Zephr API.
 *
 * @returns {array} Array of React elements to use in the Zephr form.
 */
export default function createForm(formJSON) {
  const {
    input: {
      slug,
      fields,
      registration,
    },
    submitText,
  } = formJSON;

  // Map the fields to React components.
  let components = fields.map((field) => {
    const {
      slug: id,
      placeholder,
      required,
      'default-value': defaultValue,
    } = field;

    let type = '';
    switch (id) {
      case 'email-address':
        type = 'email';
        break;
      default:
        type = 'text';
    }

    let props = {
      key: id,
      id,
      className: `zephr-input-${id}`,
      type,
      placeholder,
      required,
      defaultValue,
    };

    if ('email-address' === id) {
      props = { ...props, autoComplete: 'username' };
    }

    return React.createElement('input', props, null);
  });

  if (true === registration) {
    components = [...components, ...generatePasswordFields(slug)];
  }

  const buttonProps = {
    key: 'zephr-submit-button',
    type: 'submit',
    value: submitText,
  };

  // Create the submit button.
  const submitButton = React.createElement('input', buttonProps, null);

  // Append the submit button to the end of the array.
  components = [...components, submitButton];

  // Return the components array.
  return components;
}

function generatePasswordFields(slug) {
  const id = 'registration' === slug ? 'new-password' : 'current-password';
  const placeholder =
    'registration' === slug ?
      'Create a password for your account' :
      'Enter your password';

  const props = {
    key: id,
    id,
    className: `zephr-input-${id}`,
    type: 'password',
    placeholder,
    required: true,
    defaultValue: '',
  };

  const fields = [
    React.createElement('input', props, null),
  ];

  if ('registration' === slug) {
    const verifyId = 'verify-password';

    const verifyProps = {
      key: verifyId,
      id: verifyId,
      className: `zephr-input-${verifyId}`,
      type: 'password',
      placeholder: 'Confirm your password',
      required: true,
      defaultValue: '',
    };

    fields.push(React.createElement('input', verifyProps, null));
  }

  return fields;
}
