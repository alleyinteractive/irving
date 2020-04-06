import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import Link from 'components/helpers/link';
import { withStyles } from 'critical-style-loader/lib';
import classNames from 'classnames';

// Styles
import styles from './userGreeting.css';

const Anonymous = ({ themeName, context }) => (
  <>
    <Link
      to={`/login&redirectTo=${window.location.pathname}`}
      className={classNames(styles.button, styles[`button--${themeName}`])}
      data-event-category={context}
      data-event-action="click"
      data-event-label="sign-in"
    >
      {__('Sign in', 'mittr')}
    </Link>
    <Link
      to="/subscribe/"
      className={classNames(
        styles.subscribe,
        styles[`subscribe--${themeName}`]
      )}
      data-event-category={context}
      data-event-action="click"
      data-event-label="subscribe-button"
    >
      {__('Subscribe', 'mittr')}
    </Link>
  </>
);

Anonymous.propTypes = {
  themeName: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
};

export default withStyles(styles)(Anonymous);
