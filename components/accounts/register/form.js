import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import {
  actionSubmitForm,
  actionReceiveInvalidPassword,
  actionReceiveRegistrationError,
  actionClearFormErrors,
} from 'actions/zephrActions';
import {
  getRegistrationForm,
} from 'selectors/zephrSelector';
import DataLoading from 'components/hoc/withData/loading';
import Link from 'components/helpers/link';
import toFormElements from 'sagas/zephrSaga/forms/toFormElements';
import UserFields from './UserFields';

// Styles
import styles from './register.css';

const RegisterForm = ({
  clearErrors,
  displayFormError,
  displayInvalidPasswordError,
  submitRegistration,
  registrationForm,
}) => {
  const [components, setForm] = useState([]);
  const [captcha, setCaptcha] = useState({
    isValid: false,
    hasError: false,
  });

  useEffect(() => {
    // Exit early if there are no fields in the form.
    if (0 === Object.keys(registrationForm).length) {
      return;
    }

    const { fields } = new UserFields(
      toFormElements(registrationForm.components)
    )
      .addRecaptchaToFields(setCaptcha)
      .addQueryParamToFields('email-address')
      .addQueryParamToFields('full-name');

    // Update the form state.
    setForm(fields);
  }, [registrationForm]);

  // Submit handler.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (true === registrationForm.error) {
      clearErrors('register');
    }

    // Drop focus on the active form element.
    const focused = document.activeElement;
    focused.blur();

    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email-address');
    const password = document.getElementById('new-password');
    const verifyPassword = document.getElementById('verify-password');
    const termsCheckbox = document.getElementById('terms-checkbox');

    // Create a counter to keep track of errors.
    let errorCount = 0;

    // Check to ensure the captcha has been validated prior to submission.
    // Only run the check if the captcha has been loaded into the DOM.
    const captchaNotLoaded = document.getElementById('captcha-not-loaded');
    if (! captchaNotLoaded && false === captcha.isValid) {
      setCaptcha({
        hasError: true,
        isValid: false,
      });

      // Increment the error counter.
      errorCount += 1;
    }

    // Check to ensure the terms checkbox has been checked prior to submission.
    if (false === termsCheckbox.checked) {
      displayFormError('terms-checkbox');

      // Increment the error counter.
      errorCount += 1;
    }

    // Check to ensure that the password and it's verification value match prior to submission.
    if (password.value !== verifyPassword.value) {
      // Invalid passwords get their own dispatch action because multiple inputs need to be invalidated.
      displayInvalidPasswordError('register');

      // Increment the error counter.
      errorCount += 1;
    }

    // Check to ensure that the email address is valid prior to submission.
    if (! email.value.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/)) { // eslint-disable-line max-len
      displayFormError('email-address');

      // Increment the error counter.
      errorCount += 1;
    }

    if (! fullName.value.match(/^[a-z ,.'-]+$/i)) {
      displayFormError('full-name');

      // Increment the error counter.
      errorCount += 1;
    }

    if (0 < errorCount) {
      // Exit the submit process.
      return;
    }

    // Split the fullName value for submission to Zephr.
    const names = fullName.value.split(' ');

    submitRegistration({
      type: 'register',
      credentials: {
        email: email.value,
        password: password.value,
        attributes: {
          fullName: fullName.value,
          firstName: names[0],
          lastName: names[names.length - 1],
        },
      },
    });
  };

  // If the form has not yet been retrieved, show a loader.
  if (0 === Object.keys(registrationForm).length) {
    return (
      <div className={styles.wrapper}>
        <DataLoading />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formWrap}>
      {components}
      {true === captcha.hasError && (
        <span
          className={styles.formError}
          aria-live="assertive"
          id="captcha-error"
        >
          {__(
            `Oops! Let's try that again -
              Please complete the captcha
              in order to create your account.`,
            'mittr'
          )}
        </span>
      )}
      <p>
        {__('Review our ', 'mittr')}
        <Link to="/about/terms-of-service/" className={styles.formLink}>
          {__('terms of service', 'mittr')}
        </Link>
        {__(' and ', 'mittr')}
        <Link to="/about/privacy/" className={styles.formLink}>
          {__('privacy policy.', 'mittr')}
        </Link>
      </p>
    </form>
  );
};

RegisterForm.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  displayFormError: PropTypes.func.isRequired,
  displayInvalidPasswordError: PropTypes.func.isRequired,
  registrationForm: PropTypes.object,
  submitRegistration: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  registrationForm: {},
};

const mapDispatchToProps = (dispatch) => ({
  clearErrors: (type) => dispatch(actionClearFormErrors(type)),
  displayFormError: (type) => dispatch(actionReceiveRegistrationError(type)),
  displayInvalidPasswordError: (type) => dispatch(actionReceiveInvalidPassword(type)), // eslint-disable-line max-len
  submitRegistration: (data) => dispatch(actionSubmitForm(data)),
});

const withRedux = connect(
  (state) => ({
    registrationForm: getRegistrationForm(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(RegisterForm)
);
