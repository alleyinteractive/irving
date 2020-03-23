import React from 'react';
import { withStyles } from 'critical-style-loader/lib';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'components/helpers/link';

import { getFirstName } from 'selectors/zephrSelector';

// Styles
import styles from './updateEmail.css';

const UpdateEmailRequest = ({
  firstName,
}) => (
  <div className={styles.wrapper}>
    <p className={styles.subheader}>
      {__(
        `Thanks ${firstName}! Please check your inbox at your
        current email to confirm your new email address.`,
        'mittr'
      )}
    </p>
    <Link to="/" className={styles.homeButton}>Go Home</Link>
  </div>
);

UpdateEmailRequest.defaultProps = {
  firstName: '',
};

UpdateEmailRequest.propTypes = {
  firstName: PropTypes.string,
};

const withRedux = connect(
  (state) => ({
    firstName: getFirstName(state),
  })
);

export default withRedux(withStyles(styles)(UpdateEmailRequest));
