import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import { __, sprintf } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import { actionVerifyEmailUpdateToken } from 'actions/zephrActions';
import {
  getFirstName,
} from 'selectors/zephrSelector';

// Styles
import styles from './updateEmail.css';

const UpdateEmailConfirm = ({
  verifyToken,
  firstName,
}) => {
  useEffect(() => {
    const {
      location: {
        search,
      },
    } = window;
    // Extract the token from the query string.
    const extractToken = (url) => url.substr(url.lastIndexOf('/') + 1);
    // Set the token value.
    const token = extractToken(search);
    // Dispatch the verification action.
    verifyToken(token);
  }, []);

  return (
    <div className={styles.accountWrap}>
      <p className={styles.accountSubHeader}>
        {'' !== firstName ? (sprintf(
          __(
            'Thanks %s! Your email has been successfully updated.',
            'mittr'
          ),
          firstName
        )) : (
          __('Thanks! Your email has been successfully updated.',
            'mittr')
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

UpdateEmailConfirm.defaultProps = {
  firstName: '',
};

UpdateEmailConfirm.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  firstName: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  verifyToken: (token) => dispatch(actionVerifyEmailUpdateToken(token)),
});

const withRedux = connect(
  (state) => ({
    firstName: getFirstName(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(UpdateEmailConfirm)
);
