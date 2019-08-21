import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import Authenticated from './authenticated';
import Anonymous from './anonymous';

// Styles
import styles from './userGreeting.css';

const UserGreeting = ({ firstName, lastName, isAuthenticated }) => (
  <div className={styles.wrapper}>
    {isAuthenticated ? (
      <Authenticated firstName={firstName} lastName={lastName} />
    ) : (
      <Anonymous />
    )}
  </div>
);

UserGreeting.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withStyles(styles)(UserGreeting);
