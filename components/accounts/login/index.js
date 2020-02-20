import React, { useState, useEffect } from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getLoginForm,
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';
import {
  actionSubmitForm,
} from 'actions/zephrActions';
import history from 'utils/history';
import DataLoading from 'components/hoc/withData/loading';
import LazyRecaptcha from '../register/recaptcha';

// Styles
import styles from './login.css';

const Login = ({
  loginForm,
  submitLogin,
  isAuthenticated,
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

  // Create submit handler.
  const onSubmit = (event) => {
    event.preventDefault();

    // Create a counter to keep track of errors.
    let errorCount = 0;

    // Check to ensure the captcha has been validated prior to submission.
    if (true === loginForm.requireCaptcha && ! captcha.isValid) {
      setCaptcha({
        hasError: true,
        isValid: false,
      });

      // Increment the error counter.
      errorCount += 1;
    }

    const email = document.getElementById('email-address');
    const password = document.getElementById('current-password');

    // Drop focus on the inputs.
    const focused = document.activeElement;
    focused.blur();

    if (0 < errorCount) {
      // Exit the submit process.
      return;
    }

    submitLogin({
      type: 'login',
      credentials: {
        email: email.value,
        password: password.value,
      },
    });
  };

  useEffect(() => {
    if (0 !== Object.keys(loginForm).length) {
      const { components: fields } = loginForm;

      // If the login attempt has failed multiple times and has met the threshold set
      // in the zephrReducer, splice a captcha into form and require it to be completed
      // in order to make subsequent attempts.
      if (true === loginForm.requireCaptcha) {
        // @todo define a site key/secret for the production captcha (see: https://www.google.com/u/1/recaptcha/admin/create)
        const reCaptcha = React.createElement(
          LazyRecaptcha,
          {
            key: 'login-captcha',
            id: 'login-captcha',
            className: 'captcha',
            sitekey: '6Le-58UUAAAAANFChf85WTJ8PoZhjxIvkRyWczRt',
            verifyCallback: () => {
              setCaptcha({
                isValid: true,
                hasError: false,
              });
            },
            'aria-errormessage': 'captcha-error',
          },
          null
        );

        // Splice the captcha into the components array.
        const idMap = fields.map((el) => el.props.id);
        // Prevent the captcha from being spliced in on subsequent renders.
        if (- 1 === idMap.indexOf('login-captcha')) {
          fields.splice(fields.length - 1, 0, reCaptcha);
        }
      }

      // Update the form state.
      setForm(fields);
    }
  }, [loginForm, onSubmit]);
  console.log(components);

  // If the form has not yet been retireved, show a loader.
  if (0 === Object.keys(loginForm).length) {
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
        {__('Please enter your email address and password.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__(
          `If you have an account, we’ll get you signed in.
          If not, we’ll help you set one up. Easy, right?`,
          'mittr'
        )}
      </p>
      <form
        onSubmit={onSubmit}
        className={styles.formWrap}
      >
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
        <h2 className={styles.ssoText} id="socialMediaSignOn">
          {__('Sign on with the following social media accounts:', 'mittr')}
        </h2>
        <ul className={styles.ssoList} aria-labelledby="socialMediaSignOn">
          <li>
            <a href="https://google.com">Google</a>/
          </li>
          <li>
            <a href="https://twitter.com">Twitter</a>/
          </li>
          <li>
            <a href="https://facebook.com">Facebook</a>
          </li>
        </ul>
      </form>
      <div className={styles.alumWrap}>
        <h3 className={styles.alumTitle}>
          <span className={styles.leadIn}>{__('MIT alum?', 'mittr')}</span>{' '}
          {__('Sign in using your MIT Infinite Connection account.', 'mittr')}
        </h3>
        <button
          type="button"
          className={styles.connectBtn}
          onClick={() => {}}
        >
          {__('Connect now', 'mittr')}
        </button>
        <a href="https://google.com" className={styles.btnLink}>
          {__('Learn more', 'mittr')}
        </a>
      </div>
    </div>
  );
};

Login.defaultProps = {
  loginForm: {},
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginForm: PropTypes.object,
  submitLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (data) => dispatch(actionSubmitForm(data)),
});

const withRedux = connect(
  (state) => ({
    loginForm: getLoginForm(state),
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  mapDispatchToProps
);

export default withRedux(withStyles(styles)(Login));
