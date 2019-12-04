import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { actionVerifyUserEmail } from 'actions/userActions';
import { getUserFirstName } from 'selectors/getUser';

// Styles
import styles from './verify.css';

const Verify = ({ verifyHash, firstName }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { location: { pathname } } = window;

    const hash = pathname.replace('/verify/', '');

    verifyHash(hash);

    setIsLoading(false);
  }, isLoading);

  if (isLoading) {
    return <div />;
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
      <a href="/" className={styles.homeButton}>Go Home</a>
    </div>
  );
};

Verify.propTypes = {
  verifyHash: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  verifyHash: (hash) => dispatch(actionVerifyUserEmail(hash)),
});

const withRedux = connect(
  (state) => ({
    firstName: getUserFirstName(state),
  }),
  mapDispatchToProps
);

export default withRedux(
  withStyles(styles)(Verify)
);
