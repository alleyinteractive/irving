import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import { __, sprintf } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import { actionCheckNewEmailUpdate } from 'actions/zephrActions';
import {
  getFirstName,
} from 'selectors/zephrSelector';

// Styles
import styles from './updateEmail.css';

const UpdateEmailRequest2 = ({
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
    <div className={styles.wrapper}>
      <p className={styles.subheader}>
        {'' !== firstName ? (sprintf(
          __(
            `Thanks %s! Please check the inbox of your new
            email to complete the update process.`,
            'mittr'
          ),
          firstName
        )) : (
          __(`Thanks! Please check the inbox of your new
            email to complete the update process.`,
          'mittr')
        )}
      </p>
      <Link to="/" className={styles.homeButton}>Go Home</Link>
    </div>
  );
};

UpdateEmailRequest2.defaultProps = {
  firstName: '',
};

UpdateEmailRequest2.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  firstName: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  verifyToken: (token) => dispatch(actionCheckNewEmailUpdate(token)),
});

const withRedux = connect(
  (state) => ({
    firstName: getFirstName(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(UpdateEmailRequest2)
);
