import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import {
  getProfile,
  getAccount,
  getRegistrationForm,
} from 'selectors/zephrSelector';
import {
  actionSubmitForm,
  actionReceiveInvalidPassword,
  actionReceiveRegistrationError,
  actionClearFormErrors,
} from 'actions/zephrActions';
import history from 'utils/history';
import DataLoading from 'components/hoc/withData/loading';
import LazyRecaptcha from './recaptcha';

// Styles
import styles from './register.css';

const Register = ({
  clearErrors,
  displayFormError,
  displayInvalidPasswordError,
  isAuthenticated,
  registrationForm,
  submitRegistration,
}) => {
  // Prevent authenticated users from being able to visit this route.
  if (isAuthenticated) {
    history.push('/');
  }

  const [components, setForm] = useState([]);
  const [captcha, setCaptcha] = useState({
    isValid: false,
    hasError: false,
  });

  useEffect(() => {
    if (0 !== Object.keys(registrationForm).length) {
      const { components: fields } = registrationForm;

      const verifyCaptcha = () => {
        setCaptcha({
          isValid: true,
          hasError: false,
        });
      };

      // @todo define a site key/secret for the production captcha (see: https://www.google.com/u/1/recaptcha/admin/create)
      const reCaptcha = React.createElement(
        LazyRecaptcha,
        {
          key: 'registration-captcha',
          id: 'registration-captcha',
          className: 'captcha',
          sitekey: '6Le-58UUAAAAANFChf85WTJ8PoZhjxIvkRyWczRt',
          verifyCallback: verifyCaptcha,
          'aria-errormessage': 'captcha-error',
        },
        null
      );

      // Splice the captcha into the components array.
      const idMap = fields.map((el) => el.props.id);
      // Prevent the captcha from being spliced in on subsequent renders.
      if (- 1 === idMap.indexOf('registration-captcha')) {
        fields.splice(fields.length - 1, 0, reCaptcha);
      }

      // Set the fields.
      setForm(fields);
    }
  }, [registrationForm]);
  console.log(components);

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
    if (false === captcha.isValid) {
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
      displayInvalidPasswordError();

      // Increment the error counter.
      errorCount += 1;
    }

    // Check to ensure that the email address is valid prior to submission.
    if (! email.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
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

  // If the form has not yet been retireved, show a loader.
  if (0 === Object.keys(registrationForm).length) {
    return (
      <div className={styles.accountWrap}>
        <DataLoading />
      </div>
    );
  }

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

Register.defaultProps = {
  registrationForm: {},
};

Register.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  displayFormError: PropTypes.func.isRequired,
  displayInvalidPasswordError: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  registrationForm: PropTypes.object,
  submitRegistration: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearErrors: (type) => dispatch(actionClearFormErrors(type)),
  displayFormError: (type) => dispatch(actionReceiveRegistrationError(type)),
  displayInvalidPasswordError: () => dispatch(actionReceiveInvalidPassword()),
  submitRegistration: (data) => dispatch(actionSubmitForm(data)),
});

const withRedux = connect(
  (state) => ({
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
    registrationForm: getRegistrationForm(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Register)
);
