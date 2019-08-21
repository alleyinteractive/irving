import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';
import { sprintf, __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';

// Styles
import styles from './userGreeting.css';

const Authenticated = ({ firstName, lastName, themeName }) => {
  const lastInitial = Array.from(lastName).shift();
  return (
    <Link
      to="/account"
      className={classNames(styles.button, styles[`button--${themeName}`])}
    >
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
  themeName: PropTypes.string.isRequired,
};

export default withStyles(styles)(Authenticated);
