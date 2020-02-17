/* eslint-disable */
import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import { actionVerifyToken } from 'actions/zephrActions';

// Styles
import styles from './verify.css';

const Verify = ({ verifyToken }) => {
  // @todo replace me with the verified user from the redux store.
  const placeholderName = 'Penelope';

  useEffect(() => {
    const {
      location: {
        search,
      },
    } = window;

    const extractToken = (qs) => qs.match(/(?<=\btoken=)([^&]*)/)[0];

    const token = extractToken(search);

    verifyToken(token);
  });

  return (
    <div className={styles.accountWrap}>
      <p className={styles.accountSubHeader}>
        {__(
          `Thanks ${placeholderName}! Your email address is now verified.`,
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

const mapDispatchToProps = (dispatch) => ({
  verifyToken: (token) => dispatch(actionVerifyToken(token)),
});

const withRedux = connect(
  null,
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Verify)
);