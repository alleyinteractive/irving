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
import {
  getFirstName,
  getEmailVerified,
} from 'selectors/zephrSelector';
import DataLoading from 'components/hoc/withData/loading';

// Styles
import styles from './verify.css';

const Verify = ({
  verifyToken,
  firstName,
  emailVerified,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (false === emailVerified) {
      const {
        location: {
          search,
        },
      } = window;
      // Extract the token from the query string.
      const extractToken = (qs) => qs.match(/(?<=\btoken=)([^&]*)/)[0];
      // Set the token value.
      const token = extractToken(search);
      // Dispatch the verification action.
      verifyToken(token);
    }
  }, []);

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
};

Verify.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  emailVerified: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => ({
  verifyToken: (token) => dispatch(actionVerifyToken(token)),
});

const withRedux = connect(
  (state) => ({
    firstName: getFirstName(state),
    emailVerified: getEmailVerified(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Verify)
);
