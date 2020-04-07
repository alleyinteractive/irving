import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import {
  actionRequestVerificationEmail,
} from 'actions/zephrActions';

// Styles
import styles from './verify.css';

const ExpiredTokenForm = ({
  requestEmail,
}) => {
  const sendVerificationEmail = (event) => {
    event.preventDefault();

    const email = document.getElementById('user-verification-input');

    if (0 < email.value.length) {
      requestEmail(email.value);
    }
  };

  return (
    <div className={styles.accountWrap}>
      <p className={styles.accountSubHeader}>
        {__(
          'Oops! This link has expired.',
          'mittr'
        )}
      </p>
      <p className={styles.accountHeaderDescription}>
        {__(
          `Please use the form below to send a new link your
          email address. Already verified? `,
          'mittr'
        )}
        <Link to="/login/" className={styles.loginLink}>
          {__('Sign in.', 'mittr')}
        </Link>
      </p>
      <form
        className={styles.formWrap}
        onSubmit={sendVerificationEmail}
      >
        <input
          id="user-verification-input"
          type="email"
          className={styles.emailInput}
          placeholder={__('Enter your email address', 'mittr')}
        />
        <input
          type="submit"
          className={styles.submitButton}
          value="Send Email"
        />
      </form>
    </div>
  );
};

ExpiredTokenForm.propTypes = {
  requestEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestEmail: (email) => dispatch(actionRequestVerificationEmail(email)),
});

const withRedux = connect(
  null,
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(ExpiredTokenForm)
);
