import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import URL from 'url-parse';
import Link from 'components/helpers/link';
import {
  actionVerifyToken,
  actionRequestVerificationEmail,
} from 'actions/zephrActions';
import {
  getFirstName,
  getEmailVerified,
  getEmailVerificationError,
} from 'selectors/zephrSelector';
import DataLoading from 'components/hoc/withData/loading';

// Styles
import styles from './verify.css';

const Verify = ({
  verifyToken,
  firstName,
  emailVerified,
  hasError,
  requestEmail,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (false === emailVerified) {
      // Extract the token from the query string.
      const extractToken = () => {
        const urlObj = new URL(window.location.href, true);
        const { query: { token = '' } = {} } = urlObj || {};
        return token;
      };
      // Set the token value.
      const token = extractToken();
      // Dispatch the verification action.
      verifyToken(token);
    }
  }, []);

  const sendVerificationEmail = (event) => {
    event.preventDefault();

    const email = document.getElementById('user-verification-input');

    if (0 < email.value.length) {
      requestEmail(email.value);
    }
  };

  if (true === hasError) {
    return (
      <div className={styles.accountWrap}>
        <p className={styles.accountSubHeader}>
          {__(
            'Oops! This verification link has expired.',
            'mittr'
          )}
        </p>
        <p className={styles.accountHeaderDescription}>
          {__(
            `Please use the form below to send a new link your
            email address.`,
            'mittr'
          )}
        </p>
        <form onSubmit={sendVerificationEmail}>
          <input
            id="user-verification-input"
            type="email"
            className={styles.emailInput}
            placeholder="john.doe@example.com"
          />
          <input
            type="submit"
            className={styles.submitButton}
            value="Send Email"
          />
        </form>
      </div>
    );
  }

  if (true === emailVerified && true === isLoading) {
    setIsLoading(false);
  }

  if (true === isLoading) {
    return (
      <div className={styles.loadingWrap}>
        <DataLoading />
      </div>
    );
  }

  return (
    <div className={styles.accountWrap}>
      <p className={styles.accountSubHeader}>
        {__(
          `Thanks ${firstName}! Your email address is now verified.`,
          'mittr'
        )}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__(
          `If you are not automatically redirected in a few seconds,
          click the button below to go to the homepage.`,
          'mittr'
        )}
      </p>
      <Link to="/" className={styles.homeButton}>Go Home</Link>
    </div>
  );
};

Verify.defaultProps = {
  firstName: '',
  emailVerified: false,
  hasError: false,
};

Verify.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  emailVerified: PropTypes.bool,
  hasError: PropTypes.bool,
  requestEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  verifyToken: (token) => dispatch(actionVerifyToken(token)),
  requestEmail: (email) => dispatch(actionRequestVerificationEmail(email)),
});

const withRedux = connect(
  (state) => ({
    firstName: getFirstName(state),
    emailVerified: getEmailVerified(state),
    hasError: getEmailVerificationError(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Verify)
);
