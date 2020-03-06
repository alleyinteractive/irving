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
      slug = '',
      fields = [],
      registration = false,
      resetForm = false,
    } = {},
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
      id,
      className: `zephr-input-${id}`,
      type,
      placeholder,
      required,
      defaultValue,
    };

    if ('email-address' === id) {
      props = {
        ...props,
        required: false, // Email validation will be handled with a regex.
        autoComplete: 'username',
      };
    }

    return props;
  });

  if (true === registration || true === resetForm) {
    components = [...components, ...generatePasswordFields(slug)];
  }

  const button = {
    id: 'submit-button',
    key: 'zephr-submit-button',
    type: 'submit',
    value: submitText,
  };

  // Append the submit button to the end of the array.
  return [
    ...components,
    button,
  ];
}

/**
 * A function that adds password fields to login and registration forms.
 *
 * @param {string} formType The form's type (e.g. registration, login).
 *
 * @returns {array} fields  The generated form field components.
 */
function generatePasswordFields(formType) {
  let passwordId = 'current-password';
  let passwordPlaceholder = 'Enter your password';

  if ('registration' === formType || 'reset' === formType) {
    passwordId = 'new-password';
    passwordPlaceholder = 'Create a password for your account';
  }

  const passwordProps = {
    id: passwordId,
    className: `zephr-input-${passwordId}`,
    type: 'password',
    placeholder: passwordPlaceholder,
    required: true,
    defaultValue: '',
    autoComplete: passwordId,
  };

  let fields = [
    passwordProps,
  ];

  if ('registration' === formType) {
    fields = [...fields, ...generateRegistrationFields()];
  }

  if ('reset' === formType) {
    fields = [...fields, ...generateRegistrationFields(false)];
  }

  return fields;
}

/**
 * A function that adds fields specific to registration forms (password verification, terms of service checkbox).
 *
 * @returns {array} fields The generated form field components.
 */
function generateRegistrationFields(isRegistration = true) {
  const verifyId = 'verify-password';
  const verifyField = {
    id: verifyId,
    className: `zephr-input-${verifyId}`,
    type: 'password',
    placeholder: 'Enter that password one more time',
    required: true,
    defaultValue: '',
    autoComplete: 'new-password',
  };
  const termsField = {
    id: 'terms-checkbox',
  };

  if (! isRegistration) {
    return [verifyField];
  }

  // Return the contructed fields.
  return [verifyField, termsField];
}
