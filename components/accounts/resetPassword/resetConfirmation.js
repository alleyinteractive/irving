import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import { connect } from 'react-redux';
import {
  getProfile,
  getAccount,
} from 'selectors/zephrSelector';

// Styles
import styles from './reset.css';

const ConfirmReset = ({ isAuthenticated }) => (
  <div className={styles.accountWrap}>
    <h1 className={styles.accountHeader}>{__('Sign in', 'mittr')}</h1>
    <p className={styles.accountSubHeader}>
      {__('Thank you!', 'mittr')}
    </p>
    <p className={styles.accountHeaderDescription}>
      {__(
        'Your password has been reset.',
        'mittr'
      )}
    </p>
    {! isAuthenticated ? (
      <Link to="/login" className={styles.homeButton}>Login</Link>
    ) : (
      <Link to="/" className={styles.homeButton}>Go Home</Link>
    )}
  </div>
);

ConfirmReset.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const withRedux = connect(
  (state) => ({
    isAuthenticated:
      0 < Object.keys(getProfile(state)).length &&
      0 < Object.keys(getAccount(state)).length,
  }),
  null
);

export default withRedux(
  withStyles(styles)(ConfirmReset)
);
