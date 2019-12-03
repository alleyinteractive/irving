import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { actionSubmitUserRegistration } from 'actions/userActions';
import LazyRecaptcha from './recaptcha';

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
  const [captcha, setCaptcha] = useState({
    isValid: false,
    hasError: false,
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

      const namesArr = fullName.split(' ');
      console.log(namesArr);

      // Ensure that a full name has been entered.
      if (1 >= namesArr.length) {
        setUserFullNameInput({
          fullName,
          isValid: false,
          errorMessage: __('Please enter your full name', 'mittr'),
        });
      }

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

    const passwordMatch = password === confirmPassword;

    if (! passwordMatch) {
      setConfirmUserPasswordInput({
        confirmPassword,
        isValid: false,
        errorMessage: __('Your passwords do not match', 'mittr'),
      });

      return;
    }

    if (false === captcha.isValid) {
      setCaptcha({
        hasError: true,
        isValid: false,
      });

      return;
    }

    submitRegistration({ fullName, password });
  };

  const verifyCallback = () => {
    setCaptcha({
      isValid: true,
      hasError: false,
    });
  };

  const renderDynamicError = (obj) => (
    <span
      className={styles.formError}
      aria-live="assertive"
      id="email-error"
    >
      {__(
        `Oops! Let’s try that again —
      ${obj.errorMessage}`,
        'mittr'
      )}
    </span>
  );

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
            {
              ! userFullNameInput.isValid &&
              renderDynamicError(userFullNameInput)
            }
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
            {
              ! userPasswordInput.isValid &&
              renderDynamicError(userPasswordInput)
            }
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
            {
              ! confirmUserPasswordInput.isValid &&
              renderDynamicError(confirmUserPasswordInput)
            }
          </label>

          <label htmlFor="termsCheckbox">
            <div className={styles.checkboxWrapper}>
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
              <div
                className={classNames(styles.styledCheckbox, {
                  [styles.checked]: true === termsCheckbox.checked,
                })}
              />
              <p className={styles.termsText}>
                {__(
                  `I agree to the terms of service
                   and have reviewed the privacy policy.`,
                  'mittr'
                )}
              </p>
            </div>
            {! termsCheckbox.isValid && renderDynamicError(termsCheckbox)}
          </label>

          <div className={styles.captchaWrapper}>
            {/* @todo define a site key/secret for the production captcha (see: https://www.google.com/u/1/recaptcha/admin/create) */}
            <LazyRecaptcha
              sitekey="6Le-58UUAAAAANFChf85WTJ8PoZhjxIvkRyWczRt"
              render="explicit"
              verifyCallback={verifyCallback}
            />
          </div>
          {true === captcha.hasError && (
            <span
              className={styles.formError}
              aria-live="assertive"
              id="terms-error"
            >
              {__(
                `Please complete the captcha
                 in order to create your account.`,
                'mittr'
              )}
            </span>
          )}

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
