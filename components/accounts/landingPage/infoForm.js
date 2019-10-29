/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

import styles from './landingPage.css';

const AccountInfoForm = ({
  type,
  handleSubmit,
  isValid,
  errorMessage,
  placeholderValue,
}) => {
  const [inputState, setInputState] = useState({
    value: '',
  });
  const handleInputChange = (e) => setInputState({ value: e.target.value });
  const uniqueId =
    `changeUser${type.charAt(0).toUpperCase() + type.substring(1)}Input`;

  return (
    <form onSubmit={handleSubmit} className={styles.formWrap}>
      <div className={styles.horizontalFormGroup}>
        {! isValid && errorMessage ? errorMessage : null}

        <label htmlFor={uniqueId}>
          <input
            type={type}
            id={uniqueId}
            name={uniqueId}
            value={inputState.value}
            onChange={handleInputChange}
            className={classNames(styles.formInput, {
              [styles.inputInvalid]: ! isValid,
            })}
            placeholder={__(placeholderValue, 'mittr')}
            aria-errormessage={`${type}-error`}
          />
        </label>
        <input
          type="submit"
          className={styles.inputButton}
          value="Save changes"
        />
        {! isValid && (
          <span
            className={styles.formError}
            aria-live="assertive"
            id="email-error"
          >
            {__(errorMessage, 'mittr')}
          </span>
        )}
      </div>
    </form>
  );
};

AccountInfoForm.defaultProps = {
  isValid: true,
  errorMessage: null,
};

AccountInfoForm.propTypes = {
  type: PropTypes.oneOf([
    'email',
    'password',
  ]).isRequired,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  placeholderValue: PropTypes.string.isRequired,
};

export default withStyles(styles)(AccountInfoForm);
