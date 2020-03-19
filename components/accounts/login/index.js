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
  actionReceiveSsoSession,
} from 'actions/zephrActions';
import history from 'utils/history';
import DataLoading from 'components/hoc/withData/loading';
import toFormElements from 'sagas/zephrSaga/forms/toFormElements';
import sso, { openConnection } from 'services/ssoService';
import LazyRecaptcha from '../register/recaptcha';

// Styles
import styles from './login.css';
import Link from '../../helpers/link';

const Login = ({
  loginForm,
  submitLogin,
  isAuthenticated,
  receiveSession,
  redirectTo,
}) => {
  // Prevent authenticated users from being able to visit this route.
  if (isAuthenticated) {
    history.push(redirectTo);
  }

  const [components, setForm] = useState([]);
  const [captcha, setCaptcha] = useState({
    isValid: false,
    hasError: false,
  });
  const [tooltipActive, setTooltipState] = useState(false);

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
        redirectTo,
      },
    });
  };

  useEffect(() => {
    if (0 !== Object.keys(loginForm).length) {
      const fields = toFormElements(loginForm.components, 'login');
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

    const initSSO = async (data) => {
      const {
        data: {
          action,
          identifier,
        },
      } = data;

      if ('login' === action || 'register' === action) {
        // Get the response status and its cookie if it exists.
        const { status, cookie } = await sso.initialize(data);

        if ('success' === status) {
          receiveSession({ identifier, cookie, action });
        }
      }
    };

    window.addEventListener('message', initSSO);

    // A function that resets the state of an active tooltip.
    // It also removes any active event listeners for the active tooltip
    // allowing it to be summoned in the future.
    const updateTooltipState = () => {
      if (tooltipActive) {
        setTooltipState(false);
        // Remove the event listener.
        window.removeEventListener('click', updateTooltipState);
      }
    };

    // Add the tooltip listenter.
    window.addEventListener('click', updateTooltipState);
  }, [loginForm, tooltipActive]);

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
      <h1 className={styles.accountHeader}>{__('Account', 'mittr')}</h1>
      <p className={styles.accountSubHeader}>
        {__('Sign in to your account below.', 'mittr')}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__(
          'Don’t have one yet? ',
          'mittr'
        )}
        <Link to="/register/" className={styles.registerLink}>
          {__('Create an account now.', 'mittr')}
        </Link>
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
            <button
              type="button"
              onClick={() => {
                openConnection('login', 'google');
                sso.openGoogleClient();
              }}
            >
              Google
            </button>/
          </li>
          <li>
            {tooltipActive && (
              <div
                id="twitter-auth-desc"
                role="tooltip"
                className={styles.tooltip}
              >
                <p>
                  {__(
                    `We value your security—that’s why we
                    only support social logins that use OAuth2.`,
                    'mittr'
                  )}
                </p>
                <p>
                  <span>
                    {__(
                      `If you were previously singing in to our site
                      with Twitter, please `,
                      'mittr'
                    )}
                  </span>
                  <Link to="/register/">
                    {__('create an account ', 'mittr')}
                  </Link>
                  <span>
                    {__(
                      'or sign in another way.',
                      'mittr'
                    )}
                  </span>
                </p>
              </div>
            )}
            <button
              type="button"
              aria-describedby="twitter-auth-desc"
              onClick={() => setTooltipState(true)}
            >
              Twitter
            </button>/
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                openConnection('login', 'facebook');
                sso.openFacebookClient();
              }}
            >
              Facebook
            </button>
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
          onClick={() => {
            openConnection('login', 'mitaa');
            sso.openInfiniteConnectionClient();
          }}
        >
          {__('Connect now', 'mittr')}
        </button>
        <a
          href="https://alum.mit.edu/about/infinite-connection-terms-conditions-use" // eslint-disable-line max-len
          className={styles.btnLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {__('Learn more', 'mittr')}
        </a>
      </div>
    </div>
  );
};

Login.defaultProps = {
  loginForm: {},
  redirectTo: '/',
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginForm: PropTypes.object,
  submitLogin: PropTypes.func.isRequired,
  receiveSession: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (data) => dispatch(actionSubmitForm(data)),
  receiveSession: (cookie) => dispatch(actionReceiveSsoSession(cookie)),
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
