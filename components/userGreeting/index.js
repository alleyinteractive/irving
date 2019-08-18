import React from 'react';
import PropTypes from 'prop-types';
import Authenticated from './authenticated';

// Styles
import styles from './userGreeting.css';

const UserGreeting = ({ firstName, lastName, isAuthenticated }) => (
  <div className={styles.wrapper}>
    {isAuthenticated ? (
      <Authenticated firstName={firstName} lastName={lastName} />
    ) : (
      <Authenticated firstName="Pattie" lastName="Reaves" />
    )}
  </div>
);

UserGreeting.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default UserGreeting;
