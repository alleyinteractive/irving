import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Recaptcha from 'react-recaptcha';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { actionSubmitUserRegistration } from 'actions/userActions';

// Styles
import styles from './register.css';

const Register = ({ submitRegistration }) => {
  const [userFullNameInput, setUserFullNameInput] = useState({
    fullName: '',
    isValid: true,
    errorMessage: '',
  });
  const [userPasswordInput, setUserPasswordInput] = useState({
    password: '',
    isValid: true,
    errorMessage: '',
  });
  const [confirmUserPasswordInput, setConfirmUserPasswordInput] = useState({
    confirmPassword: '',
    isValid: true,
    errorMessage: '',
  });
  const [termsCheckbox, setTermsCheckbox] = useState({
    checked: false,
    isValid: true,
    errorMessage: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { fullName } = userFullNameInput;
    const { password } = userPasswordInput;
    const { confirmPassword } = confirmUserPasswordInput;

    // Catch all for whether or not the registration form has been filled out.
    const filledOut =
      0 < fullName.length &&
      0 < password.length &&
      0 < confirmPassword.length;

    if (! filledOut) {
      // Check to ensure that the full name input has been populated.
      if (0 >= fullName.length) {
        setUserFullNameInput({
          fullName,
          isValid: false,
          errorMessage: __('Your full name is requred', 'mittr'),
        });
      } else {
        const namesArr = fullName.split(' ');

        // Ensure that a full name has been entered.
        if (1 >= namesArr.length) {
          setUserFullNameInput({
            fullName,
            isValid: false,
            errorMessage: __('Please enter your full name', 'mittr'),
          });
        }
      }

      // Check to ensure that the password field has been populated.
      if (0 >= password.length) {
        setUserPasswordInput({
          password,
          isValid: false,
          errorMessage: __('Please enter a password', 'mittr'),
        });
      }

      // Check to ensure that the confirm password field has been populated.
      if (0 >= confirmPassword.length) {
        setConfirmUserPasswordInput({
          confirmPassword,
          isValid: false,
          errorMessage: __('Please confirm your password', 'mittr'),
        });
      }

      return;
    }

    const passwordMatch = password === confirmPassword;

    if (! passwordMatch) {
      setConfirmUserPasswordInput({
        confirmPassword,
        isValid: false,
        errorMessage: __('Your passwords do not match', 'mittr'),
      });

      return;
    }

    const { checked } = termsCheckbox;

    if (! checked) {
      setTermsCheckbox({
        checked,
        isValid: false,
        errorMessage: __('You must agree to the terms of service', 'mittr'),
      });

      return;
    }

    submitRegistration({ fullName, password });
  };

  return (
    <div className={styles.accountWrap}>
      <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__('Thanks! Just one more step.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__('Complete your account information below.', 'mittr')}
      </p>
      <form onSubmit={handleSubmit} className={styles.formWrap}>
        <div className={styles.formGroup}>
          <label htmlFor="userFullNameInput">
            <input
              type="text"
              id="userFullNameInput"
              name="userFullNameInput"
              value={userFullNameInput.fullName}
              onChange={(event) => {
                const { value } = event.target;
                setUserFullNameInput({
                  fullName: value,
                  isValid: true,
                  errorMessage: '',
                });
              }}
              className={classNames(styles.formInput, {
                [styles.inputInvalid]: ! userFullNameInput.isValid,
              })}
              placeholder={__('Enter your full name', 'mittr')}
              aria-errormessage="fullname-error"
            />
            {! userFullNameInput.isValid && (
              <span
                className={styles.formError}
                aria-live="assertive"
                id="email-error"
              >
                {__(
                  `Oops! Let’s try that again —
                ${userFullNameInput.errorMessage}`,
                  'mittr'
                )}
              </span>
            )}
          </label>
          <label htmlFor="userPasswordInput">
            <input
              type="password"
              id="userPasswordInput"
              name="userPasswordInput"
              value={userPasswordInput.password}
              onChange={(event) => {
                const { value } = event.target;
                setUserPasswordInput({
                  password: value,
                  isValid: true,
                  errorMessage: '',
                });
              }}
              className={classNames(styles.formInput, {
                [styles.inputInvalid]: ! userPasswordInput.isValid,
              })}
              placeholder={__('Create a password for your account', 'mittr')}
              aria-errormessage="password-error"
            />
            {! userPasswordInput.isValid && (
              <span
                className={styles.formError}
                aria-live="assertive"
                id="email-error"
              >
                {__(
                  `Oops! Let’s try that again —
                ${userPasswordInput.errorMessage}`,
                  'mittr'
                )}
              </span>
            )}
          </label>
          <label htmlFor="confirmUserPasswordInput">
            <input
              type="password"
              id="confirmUserPasswordInput"
              name="confirmUserPasswordInput"
              value={confirmUserPasswordInput.confirmPassword}
              onChange={(event) => {
                const { value } = event.target;
                setConfirmUserPasswordInput({
                  confirmPassword: value,
                  isValid: true,
                  errorMessage: '',
                });
              }}
              className={classNames(styles.formInput, {
                [styles.inputInvalid]: ! confirmUserPasswordInput.isValid,
              })}
              placeholder={__('Confirm your password', 'mittr')}
              aria-errormessage="confirm-password-error"
            />
            {! confirmUserPasswordInput.isValid && (
              <span
                className={styles.formError}
                aria-live="assertive"
                id="email-error"
              >
                {__(
                  `Oops! Let’s try that again —
                ${confirmUserPasswordInput.errorMessage}`,
                  'mittr'
                )}
              </span>
            )}
          </label>
          {/* @todo stub. */}
          <label htmlFor="termsCheckbox">
            <input
              type="checkbox"
              id="termsCheckbox"
              name="termsCheckbox"
              checked={termsCheckbox.checked}
              onChange={(event) => {
                const { checked } = event.target;
                setTermsCheckbox({
                  checked,
                  isValid: true,
                  errorMessage: '',
                });
              }}
              className={styles.formCheckbox}
              aria-errormessage="terms-error"
            />
            <p className={styles.termsText}>
              {__(
                'I agree to the terms of service and have reviewed the privacy policy.', // eslint-disable-line max-len
                'mittr'
              )}
            </p>
            {! termsCheckbox.isValid && (
              <span
                className={styles.formError}
                aria-live="assertive"
                id="terms-error"
              >
                {__(
                  `Oops! Let’s try that again —
                ${termsCheckbox.errorMessage}`,
                  'mittr'
                )}
              </span>
            )}
          </label>
          <Recaptcha sitekey="superdupersecret" />
          <input
            type="submit"
            className={styles.createBtn}
            value="Create this account"
          />
        </div>
        <h2 className={styles.confirmationText}>
          {__(
            "We'll email you a password confirmation link. Happy reading!", // eslint-disable-line quotes
            'mittr'
          )}
        </h2>
      </form>
    </div>
  );
};

Register.propTypes = {
  submitRegistration: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitRegistration: (payload) => dispatch(
    actionSubmitUserRegistration(payload)
  ),
});
const withRedux = connect(
  undefined,
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Register)
);
