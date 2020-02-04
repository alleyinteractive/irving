import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

export const FormInput = ({
  id,
  className,
  type,
  placeholder,
  defaultValue,
  required,
  autoComplete,
}) => (
  <label key={id} htmlFor={id}>
    <input
      id={id}
      className={className}
      name={id}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      autoComplete={autoComplete}
      aria-errormessage={`${id}-error`}
    />
  </label>
);

FormInput.defaultProps = {
  required: false,
  autoComplete: '',
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export const TermsCheckbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  // Change handler.
  const onChange = (event) => {
    const { checked } = event.target;
    // Update state value.
    setIsChecked(checked);
  };
  const checkboxId = 'terms-checkbox';

  return (
    <label
      key={checkboxId}
      className="zephr-input-checkbox-wrapper"
      htmlFor={checkboxId}
    >
      <input
        {...props}
        type="checkbox"
        id={checkboxId}
        name={checkboxId}
        checked={isChecked}
        onChange={onChange}
        className="zephr-input-terms-checkbox"
        aria-errormessage="terms-error"
      />
      <div className="styled-checkbox" />
      <span className="terms-text">
        {__(
          `I agree to the terms of service
            and have reviewed the privacy policy.`,
          'mittr'
        )}
      </span>
    </label>
  );
};
