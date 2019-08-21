import React from 'react';
import PropTypes from 'prop-types';
import { sprintf, __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './userGreeting.css';

const Authenticated = ({ firstName, lastName }) => {
  const lastInitial = Array.from(lastName).shift();
  return (
    <Link to="/account" className={styles.button}>
      {sprintf(__('Hello, %(firstName)s %(lastInitial)s.', 'mittr'), {
        firstName,
        lastInitial,
      })}
    </Link>
  );
};

Authenticated.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default Authenticated;
